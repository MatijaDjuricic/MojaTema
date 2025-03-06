<?php

namespace App\Interfaces;

use App\Http\Requests\User\updateUserRequest;
use Illuminate\Http\Resources\Json\JsonResource;
interface IUserService {
    public function getAllUsers(): JsonResource;
    public function getUserById(int $id): JsonResource;
    public function getChatAvailableUsers(): JsonResource;
    public function updateUser(updateUserRequest $request, int $id): JsonResource;
    public function deleteUser(int $id): bool;
}