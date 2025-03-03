<?php

namespace App\Services;

use App\Models\Subject;
use App\Models\ProfessorSubject;
use App\Interfaces\ISubjectService;
use App\Http\Resources\SubjectResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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