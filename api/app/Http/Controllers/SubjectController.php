<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Subject\CreateSubjectRequest;
use App\Http\Requests\Subject\UpdateSubjectRequest;
use App\Interfaces\ISubjectService;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function __construct(private readonly ISubjectService $subjectService) {}
    public function subjectsAll() {
        try {
            $data = $this->subjectService->getAllSubjects();
            return $data 
                ? $this->successResponse($data, 200)
                : $this->errorResponse("Subject not found", 404);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function subjectById(int $id) {
        try {
            $data = $this->subjectService->getSubjectById($id);
            return $this->successResponse($data, 200);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function subjectsByProfessor(int $id) {
        try {
            $data = $this->subjectService->getSubjectsByProfessor($id);
            return $this->successResponse($data, 200);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function createSubject(CreateSubjectRequest $request) {
        try {
            $data = $this->subjectService->createSubject($request);
            return $this->successResponse($data, 201);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function importSubjects(Request $request) {
        try {
            $imported = $this->subjectService->importSubjects($request);
            if ($imported) return $this->successResponse(['message' => 'Subjects imported successfully'], 201);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function updateSubject(UpdateSubjectRequest $request, int $id) {
        try {
            $data = $this->subjectService->updateSubject($request, $id);
            return $data
                ? $this->successResponse($data, 200)
                : $this->errorResponse('Subject not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function deleteSubject(int $id) {
        try {
            $deleted = $this->subjectService->deleteSubject($id);
            return $deleted
                ? $this->successResponse(['message' => 'Subject deleted successfully'], 200)
                : $this->errorResponse('Subject not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse('Error deleting subject: ' . $e->getMessage(), 500);
        }
    }
}