<?php

namespace App\Interfaces;

use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

interface IAuthService {
    public function me(Request $request): JsonResource;
    public function register(RegisterRequest $request): JsonResource;
    public function login(LoginRequest $request): JsonResource;
    public function logout(): JsonResource;
    public function refresh(): JsonResource;
    public function changePassword(ChangePasswordRequest $request): JsonResource;
}