<?php

namespace App\Interfaces;

use App\Http\Requests\ProfessorSubject\CreateProfessorSubjectRequest;
use App\Http\Requests\ProfessorSubject\UpdateProfessorSubjectRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

interface IProfessorSubjectService
{
    public function getAllProfessorSubjects(): JsonResource;
    public function getProfessorSubjectById(int $id): JsonResource;
    public function getProfessorSubjectsByProfessor(int $id): JsonResource;
    public function createProfessorSubject(CreateProfessorSubjectRequest $request): JsonResource;
    public function importProfessorSubjects(Request $request): bool;
    public function updateProfessorSubject(UpdateProfessorSubjectRequest $request, int $id): JsonResource;
    public function deleteProfessorSubject(int $id): bool;
}