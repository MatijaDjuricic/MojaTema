<?php

namespace App\Http\Controllers;

use App\Enums\UserRoleEnum;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\IUserService;

class UserController extends Controller {
    public function __construct(private readonly IUserService $userService) {}
    public function usersAll() {
        try {
            $data = $this->userService->getAllUsers();
            return $data 
                ? $this->successResponse($data, 200)
                : $this->errorResponse("Subject not found", 404);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function userById(int $id) {
        try {
            $data = $this->userService->getUserById($id);
            return $this->successResponse($data, 200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function chatAvailableUsers(Request $request) {
        try {
            $receiverId = $request->query('receiver_id', null);
            $data = $this->userService->getChatAvailableUsers();
            if ($receiverId) {
                $data = $data->filter(fn($user) => $user->id == $receiverId);
                if ($data->isEmpty()) {
                    return $this->errorResponse('User with the specified receiver_id not found', 404);
                }
            }
            return $data
                ? $this->successResponse($data, 200)
                : $this->errorResponse('No avaliable users for chat', 404);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function createUser(CreateUserRequest $request) {
        try {
            $data = $this->userService->createUser($request);
            return $this->successResponse($data, 201);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function importUsers(Request $request) {
        try {
            $imported = $this->userService->importUsers($request);
            if ($imported) return $this->successResponse(['message' => 'Users imported successfully'], 201);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function updateUser(UpdateUserRequest $request, int $id) {
        try {
            $data = $this->userService->updateUser($request, $id);
            return $data
                ? $this->successResponse($data, 200)
                : $this->errorResponse('User not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function deleteUser(int $id) {
        try {
            $deleted = $this->userService->deleteUser($id);
            return $deleted
                ? $this->successResponse(['message' => 'User deleted successfully'], 200)
                : $this->errorResponse('User not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}