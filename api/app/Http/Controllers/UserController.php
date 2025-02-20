<?php

namespace App\Http\Controllers;

use App\Enums\UserRoleEnum;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function userById(int $id) {
        try {
            $data = $this->userService->getUserById($id);
            return $this->successResponse($data, 200);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function chatAvailableUsers() {
        try {
            $data = $this->userService->getChatAvailableUsers();
            return $data
                ? $this->successResponse($data, 200)
                : $this->errorResponse('No avaliable users for chat', 404);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
}