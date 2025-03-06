<?php

namespace App\Interfaces;

use App\Http\Requests\Subject\UpdateSubjectRequest;
use Illuminate\Http\Resources\Json\JsonResource;
interface ISubjectService {
    public function getAllSubjects(): JsonResource;
    public function getSubjectById(int $id): JsonResource;
    public function getSubjectsByProfessor(int $id): JsonResource;
    public function updateSubject(UpdateSubjectRequest $request, int $id): JsonResource;
    public function deleteSubject(int $id): bool;
}