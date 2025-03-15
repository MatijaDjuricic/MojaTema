<?php

namespace App\Interfaces;

use App\Http\Requests\Subject\CreateSubjectRequest;
use App\Http\Requests\Subject\UpdateSubjectRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
interface ISubjectService {
    public function getAllSubjects(): JsonResource;
    public function getSubjectById(int $id): JsonResource;
    public function getSubjectsByProfessor(int $id): JsonResource;
    public function createSubject(CreateSubjectRequest $request): JsonResource;
    public function importSubjects(Request $request): bool;
    public function updateSubject(UpdateSubjectRequest $request, int $id): JsonResource;
    public function deleteSubject(int $id): bool;
}