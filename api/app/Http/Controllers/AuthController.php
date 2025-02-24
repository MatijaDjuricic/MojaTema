<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Interfaces\IAuthService;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
class AuthController extends Controller {
    public function __construct(private readonly IAuthService $authService) {}
    public function me(Request $request) {
        return $this->successResponse(new UserResource($request->user()), 200);
    }
    public function register(RegisterRequest $request) {
        $data = $this->authService->register($request);
        return $this->successResponse($data, 201);
    }
    public function login(LoginRequest $request) {
        $data = $this->authService->login($request);
        if (!$data) {
            return $this->errorResponse("Bad credentials", 401);
        }
        return $this->successResponse($data, 200);
    }
    public function logout(Request $request) {
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });
        $request->session()->flush();
        $request->session()->regenerateToken();
        cookie()->queue(cookie()->forget('laravel_session'));
        return $this->successResponse(['message' => 'Logged out successfully'], 200);
    }
    public function changePassword(ChangePasswordRequest $request) {
        $data = $this->authService->changePassword($request);
        if (!$data) {
            return $this->errorResponse("Current password is incorrect", 400);
        }
        return $this->successResponse($data, 200);
    }
}