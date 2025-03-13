<?php

namespace App\Interfaces;

use Illuminate\Http\Request;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Http\Resources\Json\JsonResource;
interface IUserService {
    public function getAllUsers(): JsonResource;
    public function getUserById(int $id): JsonResource;
    public function getChatAvailableUsers(): JsonResource;
    public function createUser(CreateUserRequest $request): JsonResource;
    public function importUsers(Request $request): bool;
    public function updateUser(UpdateUserRequest $request, int $id): JsonResource;
    public function deleteUser(int $id): bool;
}