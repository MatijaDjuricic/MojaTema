<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Interfaces\IAuthService;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Auth\Access\AuthorizationException;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class AuthController extends Controller
{
    public function __construct(private readonly IAuthService $authService) {}

    public function me(Request $request) {
        try {
            $data = $this->authService->me($request);
            return $this->successResponse($data, 200);
        }
        catch (\Exception $e) {
            return $this->errorResponse("Error fetching user data: " . $e->getMessage(), 500);
        }
    }

    public function register(RegisterRequest $request) {
        try {
            $data = $this->authService->register($request);
            return $this->successResponse($data, 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Error registering user: " . $e->getMessage(), 500);
        }
    }

    public function login(LoginRequest $request) {
        try {
            $data = $this->authService->login($request);
            return $this->successResponse($data, 200);
        } catch (AuthorizationException $e) {
            return $this->errorResponse($e->getMessage(), 401);
        } catch (\Exception $e) {
            return $this->errorResponse("Error logging in: " . $e->getMessage(), 500);
        }
    }

    public function logout(Request $request) {
        try {
            $request->user()?->tokens()?->delete();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return $this->successResponse(['message' => 'Logged out successfully'], 200);
        } catch (\Exception $e) {
            return $this->errorResponse("Error logging out: " . $e->getMessage(), 500);
        }
    }

    public function changePassword(ChangePasswordRequest $request) {
        try {
            $data = $this->authService->changePassword($request);
            return $this->successResponse($data, 200);
        } catch (BadRequestException $e) {
            return $this->errorResponse($e->getMessage(), 400);
        } catch (\Exception $e) {
            return $this->errorResponse("Error changing password: " . $e->getMessage(), 500);
        }
    }
}