<?php

namespace App\Services;

use App\Http\Requests\ProfessorSubject\CreateProfessorSubjectRequest;
use App\Http\Requests\ProfessorSubject\UpdateProfessorSubjectRequest;
use App\Models\ProfessorSubject;
use App\Imports\ProfessorSubjectImport;
use App\Interfaces\IProfessorSubjectService;
use App\Http\Resources\ProfessorSubjectResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Cache;

class ProfessorSubjectService implements IProfessorSubjectService
{
    public function getAllProfessorSubjects(): JsonResource {
        return Cache::remember('professor_subjects_all', 60, function () {
            return ProfessorSubjectResource::collection(ProfessorSubject::all());
        });
    }

    public function getProfessorSubjectById(int $id): JsonResource {
        return Cache::remember("professor_subject_{$id}", 60, function () use ($id) {
            $professorSubject = ProfessorSubject::find($id);
            if (!$professorSubject) {
                throw new ModelNotFoundException('Professor-Subject not found.');
            }
            return ProfessorSubjectResource::make($professorSubject);
        });
    }
    public function getProfessorSubjectsByProfessor(int $id): JsonResource {
        return Cache::remember("professor_subjects_by_professor_{$id}", 60, function () use ($id) {
            $professorSubjects = ProfessorSubject::where('user_id', $id)
                ->with('subject')
                ->get();
            if (!$professorSubjects) {
                throw new ModelNotFoundException('Professor-Subject not found.');
            }
            return ProfessorSubjectResource::collection($professorSubjects);
        });
    }
    public function createProfessorSubject(CreateProfessorSubjectRequest $request): JsonResource {
        $fields = $request->validated();
        $professorSubject = ProfessorSubject::create($fields);
        Cache::forget('professor_subjects_all');
        return ProfessorSubjectResource::make($professorSubject);
    }
    public function importProfessorSubjects(Request $request): bool {
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
                    Excel::import(new ProfessorSubjectImport, $fullPath);
                    break;
                case 'csv':
                    Excel::import(new ProfessorSubjectImport, $file);
                    break;
                default:
                    return false;
            }
            Cache::forget('professor_subjects_all');
            return true;
        } catch (\Exception $e) {
            \Log::error('Error importing professor subjects: ' . $e->getMessage());
            throw new \Exception('Error importing subject.');
        } finally {
            Storage::delete($path);
        }
    }
    public function updateProfessorSubject(UpdateProfessorSubjectRequest $request, int $id): JsonResource {
        $fields = $request->validated();
        $professorSubject = ProfessorSubject::find($id);
        if (!$professorSubject) {
            throw new ModelNotFoundException('Professor-Subject not found.');
        }
        $professorSubject->update($fields);
        Cache::forget('professor_subjects_all');
        return ProfessorSubjectResource::make($professorSubject);
    }
    public function deleteProfessorSubject(int $id): bool {
        $professorSubject = ProfessorSubject::find($id);
        if (!$professorSubject) {
            throw new ModelNotFoundException('Professor-Subject not found.');
        }
        $professorSubject->delete();
        Cache::forget('professor_subjects_all');
        return true;
    }
}