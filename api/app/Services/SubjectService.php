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
class SubjectService implements ISubjectService
{
    public function getAllSubjects(): JsonResource {
        try {
            return SubjectResource::collection(Subject::all());
        } catch (\Exception $e) {
            \Log::error('Error fetching all subjects: ' . $e->getMessage());
            throw new \Exception('Error fetching subjects.');
        }
    }
    public function getSubjectById(int $id): JsonResource {
        try {
            $subject = Subject::find($id);
            if (!$subject) {
                throw new ModelNotFoundException('Subject not found.');
            }
            return SubjectResource::make($subject);
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (\Exception $e) {
            \Log::error('Error fetching subject by ID: ' . $e->getMessage());
            throw new \Exception('Error fetching subject by ID.');
        }
    }
    public function getSubjectsByProfessor(int $id): JsonResource {
        try {
            $subjects = ProfessorSubject::where('user_id', $id)
                ->with('subject')
                ->get();
            if (!$subjects) {
                throw new ModelNotFoundException('Topic not found.');
            }
            return SubjectResource::collection($subjects->pluck('subject'));
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (\Exception $e) {
            \Log::error('Error fetching subject by ID: ' . $e->getMessage());
            throw new \Exception('Error fetching subject by ID.');
        }
    }
    public function createSubject(CreateSubjectRequest $request): JsonResource {
        try {
            $fields = $request->validated();
            $topic = Subject::create($fields);
            return SubjectResource::make($topic);
        } catch (\Exception $e) {
            \Log::error('Error creating subject: ' . $e->getMessage());
            throw new \Exception('Error creating subject.');
        }
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
                    return true;
                case 'csv':
                    Excel::import(new SubjectImport, $file);
                    return true;
                default:
                    return false;
            }
        } catch (\Exception $e) {
            \Log::error('Error importing subject: ' . $e->getMessage());
            throw new \Exception('Error importing subject.');
        } finally {
            Storage::delete($path);
        }
    }
    public function updateSubject(UpdateSubjectRequest $request, int $id): JsonResource {
        try {
            $subject = Subject::find($id);
            $fields = $request->validated();
            $subject->update($fields);
            return SubjectResource::make($subject);
        } catch (\Exception $e) {
            \Log::error('Error updating subject: ' . $e->getMessage());
            throw new \Exception('Error updating subject.');
        }
    }
    public function deleteSubject(int $id): bool {
        try {
            $subject = Subject::find($id);
            if (!$subject) return false;
            return $subject->delete();
        } catch (\Exception $e) {
            \Log::error('Error deleting subject: ' . $e->getMessage());
            throw new \Exception('Error deleting subject.');
        }
    }
}