<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfessorSubject\CreateProfessorSubjectRequest;
use App\Http\Requests\ProfessorSubject\UpdateProfessorSubjectRequest;
use App\Interfaces\IProfessorSubjectService;
use Illuminate\Http\Request;

class ProfessorSubjectController extends Controller
{
    public function __construct(private readonly IProfessorSubjectService $professorSubjectService) {}
    public function professorSubjectsAll() {
        try {
            $data = $this->professorSubjectService->getAllProfessorSubjects();
            return $data
                ? $this->successResponse($data, 200)
                : $this->errorResponse("Professor-Subject not found", 404);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function professorSubjectById(int $id) {
        try {
            $data = $this->professorSubjectService->getProfessorSubjectById($id);
            return $this->successResponse($data, 200);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function professorSubjectsByProfessor(int $id) {
        try {
            $data = $this->professorSubjectService->getProfessorSubjectsByProfessor($id);
            return $this->successResponse($data, 200);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function createProfessorSubject(CreateProfessorSubjectRequest $request) {
        try {
            $data = $this->professorSubjectService->createProfessorSubject($request);
            return $this->successResponse($data, 201);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function importProfessorSubjects(Request $request) {
        try {
            $imported = $this->professorSubjectService->importProfessorSubjects($request);
            if ($imported) return $this->successResponse(['message' => 'Professor-Subjects imported successfully'], 201);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function updateProfessorSubject(UpdateProfessorSubjectRequest $request, int $id) {
        try {
            $data = $this->professorSubjectService->updateProfessorSubject($request, $id);
            return $data
                ? $this->successResponse($data, 200)
                : $this->errorResponse('Professor-Subject not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function deleteProfessorSubject(int $id) {
        try {
            $deleted = $this->professorSubjectService->deleteProfessorSubject($id);
            return $deleted
                ? $this->successResponse(['message' => 'Professor-Subject deleted successfully'], 200)
                : $this->errorResponse('Professor-Subject not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse('Error deleting professor-subject: ' . $e->getMessage(), 500);
        }
    }
}