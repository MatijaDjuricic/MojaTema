<?php

namespace App\Services;

use App\Models\Topic;
use App\Models\Student;
use App\Enums\TopicStatusEnum;
use App\Enums\UserRoleEnum;
use App\Imports\TopicImport;
use App\Http\Requests\Topic\CreateTopicRequest;
use App\Http\Requests\Topic\UpdateTopicRequest;
use App\Http\Requests\Topic\UpdateTopicStatusRequest;
use App\Interfaces\ITopicService;
use App\Http\Resources\TopicResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Cache;

class TopicService implements ITopicService
{
    public function getAllTopics(string $search = ''): JsonResource {
        return Cache::remember('topics_all' . $search, 60, function () use ($search) {
            $query = Topic::with(['subject', 'professor', 'student']);
            if ($search != '') {
                $query->where(function($q) use ($search) {
                    $q->where('topics.title', 'like', '%' . $search . '%')
                    ->orWhereHas('subject', function($q) use ($search) {
                        $q->where('title', 'like', '%' . $search . '%');
                    })
                    ->orWhereHas('professor', function($q) use ($search) {
                        $q->where('first_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%');
                    });
                });
            }
            return TopicResource::collection($query->get());
        });
    }

    public function getReportedTopics(): JsonResource {
        $topics = Cache::remember('reported_topics', 60, function () {
            return Topic::with(['subject', 'professor', 'student'])
                ->where(function ($q) {
                    $q->where('user_id', auth()->user()->id)
                    ->whereHas('student', function ($q) {
                        $q->whereNotNull('user_id');
                    })
                    ->orWhereHas('student', function ($q) {
                        $q->where('user_id', auth()->user()->id);
                    });
                })
                ->get();
        });
        return TopicResource::collection($topics);
    }

    public function getTopicById(int $id): JsonResource {
        return Cache::remember("topic_{$id}", 60, function () use ($id) {
            $topic = Topic::find($id);
            if (!$topic) {
                throw new ModelNotFoundException('Topic not found.');
            }
            return TopicResource::make($topic);
        });
    }

    public function getTopicsByProfessor(int $id): JsonResource {
        return Cache::remember("topics_by_professor_{$id}", 60, function () use ($id) {
            $topics = Topic::where('user_id', $id)
                ->with(['subject', 'professor', 'student'])
                ->get();
            if (!$topics) {
                throw new ModelNotFoundException('Topic not found.');
            }
            return TopicResource::collection($topics);
        });
    }

    public function createTopic(CreateTopicRequest $request): JsonResource {
        $fields = $request->validated();
        Gate::authorize('create', Topic::class);
        $topic = Topic::create([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'subject_id' => $fields['subject_id'],
            'status' => TopicStatusEnum::FREE,
            'user_id' => $fields['professor_id'] ? $fields['professor_id'] : auth()->user()->id,
        ]);
        Cache::forget('topics_all');
        Cache::forget("reported_topics");
        Cache::forget("topics_by_professor_" . auth()->user()->id);
        return TopicResource::make($topic);
    }

    public function importTopics(Request $request): bool {
        $request->validate([
            'file' => 'required|mimes:xlsx,txt,csv|max:10240',
        ]);
        Gate::authorize('create', Topic::class);
        $file = $request->file('file');
        $path = $file->storeAs('imports', $file->getClientOriginalName());
        $fullPath = storage_path('app/public/' . $path);
        if (!file_exists($fullPath)) {
            throw new \Exception('File not found on server.');
        }
        try {
            switch ($file->getClientOriginalExtension()) {
                case 'xlsx':
                    Excel::import(new TopicImport, $fullPath);
                    break;
                case 'csv':
                    Excel::import(new TopicImport, $file);
                    break;
                default:
                    return false;
            }
            Cache::forget('topics_all');
            Cache::forget("reported_topics");
            Cache::forget("topics_by_professor_" . auth()->user()->id);
            return true;
        } catch (\Exception $e) {
            \Log::error('Error importing topic: ' . $e->getMessage());
            throw new \Exception('Error importing topic.');
        } finally {
            Storage::delete($path);
        }
    }

    public function updateTopic(UpdateTopicRequest $request, int $id): JsonResource {
        $topic = Topic::find($id);
        if (!$topic) {
            throw new ModelNotFoundException('Topic not found.');
        }
        Gate::authorize('update', $topic);
        $fields = $request->validated();
        $student = $fields['student_user_id']
            ? Student::where('user_id', $fields['student_user_id'])->first() : null;
        $topic->update([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'status' => !$student ? TopicStatusEnum::FREE->value : $fields['status'],
            'subject_id' => $fields['subject_id'],
            'user_id' => $fields['professor_id'],
            'student_id' => $student && $fields['status'] != TopicStatusEnum::FREE->value
                ? $student->id : null,
        ]);
        Cache::forget('topics_all');
        Cache::forget("topic_{$id}");
        Cache::forget("reported_topics");
        Cache::forget("topics_by_professor_". auth()->user()->id);
        return TopicResource::make($topic);
    }

    public function updateTopicStatus(UpdateTopicStatusRequest $request, int $id): JsonResource {
        $topic = Topic::find($id);
        $fields = $request->validated();
        if (auth()->user()->role == UserRoleEnum::STUDENT->value) {
            $student = Student::where('user_id', auth()->user()->id)->first();
            if (!$topic || !$student) {
                throw new ModelNotFoundException('Topic or student are not found.');
            }
            Gate::authorize('updateStatusByStudent', $topic);
            $topic->update([
                'status' => $fields['status'],
                'student_id' => $fields['status'] != TopicStatusEnum::FREE->value ? $student->id : null,
            ]);
        }
        else if (auth()->user()->role == UserRoleEnum::PROFESSOR->value) {
            if (!$topic) {
                throw new ModelNotFoundException('Topic or professor are not found.');
            }
            Gate::authorize('updateStatusByProfessor', $topic);
            $data = [
                'status' => $fields['status'],
            ];
            if ($fields['status'] == TopicStatusEnum::FREE->value) $data['student_id'] = null;
            $topic->update(Arr::only($data, ['status', 'student_id']));
        }
        Cache::forget('topics_all');
        Cache::forget("topic_{$id}");
        Cache::forget("reported_topics");
        Cache::forget("topics_by_professor_" . auth()->user()->id);
        return TopicResource::make($topic);
    }

    public function deleteTopic(int $id): bool {
        $topic = Topic::find($id);
        if (!$topic) return false;
        Gate::authorize('delete', $topic);
        Cache::forget('topics_all');
        Cache::forget("topic_{$id}");
        Cache::forget("reported_topics");
        Cache::forget("topics_by_professor_". auth()->user()->id);
        return $topic->delete();
    }
}