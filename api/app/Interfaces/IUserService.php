<?php

namespace App\Interfaces;

use Illuminate\Http\Resources\Json\JsonResource;
interface IUserService {
    public function getAllUsers(): JsonResource;
    public function getUserById(int $id): JsonResource;
    public function getChatAvailableUsers(): JsonResource;
    public function deleteUser(int $id): bool;
}