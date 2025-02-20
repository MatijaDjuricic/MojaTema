<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Interfaces\ISubjectService;
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
}