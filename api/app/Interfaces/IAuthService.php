<?php

namespace App\Interfaces;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
interface IAuthService {
    public function register(RegisterRequest $request): array;
    public function login(LoginRequest $request): ?array;
}