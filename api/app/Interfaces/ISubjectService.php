<?php

namespace App\Interfaces;

use Illuminate\Http\Resources\Json\JsonResource;
interface ISubjectService {
    public function getAllSubjects(): JsonResource;
    public function getSubjectById(int $id): JsonResource;
    public function getSubjectsByProfessor(int $id): JsonResource;
}