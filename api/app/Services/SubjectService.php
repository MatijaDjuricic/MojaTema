<?php

namespace App\Services;

use App\Models\Subject;
use App\Models\ProfessorSubject;
use App\Imports\SubjectImport;
use App\Http\Requests\Subject\CreateSubjectRequest;
use App\Http\Requests\Subject\UpdateSubjectRequest;
use App\Interfaces\ISubjectService;
use App\Http\Resources\SubjectResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Cache;

class SubjectService implements ISubjectService
{
    public function getAllSubjects(): JsonResource {
        return Cache::remember('subjects_all', 60, function () {
            return SubjectResource::collection(Subject::all());
        });
    }

    public function getSubjectById(int $id): JsonResource {
        return Cache::remember("subject_{$id}", 60, function () use ($id) {
            $subject = Subject::find($id);
            if (!$subject) {
                throw new ModelNotFoundException('Subject not found.');
            }
            return SubjectResource::make($subject);
        });
    }

    public function getSubjectsByProfessor(int $id): JsonResource {
        return Cache::remember("subjects_by_professor_{$id}", 60, function () use ($id) {
            $subjects = ProfessorSubject::where('user_id', $id)
                ->with('subject')
                ->get();
            if (!$subjects) {
                throw new ModelNotFoundException('Topic not found.');
            }
            return SubjectResource::collection($subjects->pluck('subject'));
        });
    }

    public function createSubject(CreateSubjectRequest $request): JsonResource {
        $fields = $request->validated();
        $subject = Subject::create($fields);
        Cache::forget('subjects_all');
        return SubjectResource::make($subject);
    }

    public function importSubjects(Request $request): bool {
        $request->validate([
            'file' => 'required|mimes:xlsx,txt,csv|max:10240',
        ]);
        $file = $request->file('file');
        $path = $file->storeAs('imports', $file->getClientOriginalName());
        $fullPath = storage_path('app/public/' . $path);
        if (!file_exists($fullPath)) {
            throw new \Exception('File not found on server.');
        }
        try {
            switch ($file->getClientOriginalExtension()) {
                case 'xlsx':
                    Excel::import(new SubjectImport, $fullPath);
                    break;
                case 'csv':
                    Excel::import(new SubjectImport, $file);
                    break;
                default:
                    return false;
            }
            Cache::forget('subjects_all');
            return true;
        } catch (\Exception $e) {
            \Log::error('Error importing subject: ' . $e->getMessage());
            throw new \Exception('Error importing subject.');
        } finally {
            Storage::delete($path);
        }
    }

    public function updateSubject(UpdateSubjectRequest $request, int $id): JsonResource {
        $subject = Subject::find($id);
        if (!$subject) {
            throw new ModelNotFoundException('Subject not found.');
        }
        $fields = $request->validated();
        $subject->update($fields);
        Cache::forget("subject_{$id}");
        Cache::forget('subjects_all');
        return SubjectResource::make($subject);
    }

    public function deleteSubject(int $id): bool {
        $subject = Subject::find($id);
        if (!$subject) return false;
        Cache::forget("subject_{$id}");
        Cache::forget('subjects_all');
        return $subject->delete();
    }
}