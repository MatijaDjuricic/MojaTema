<?php

namespace App\Services;

use App\Models\User;
use App\Http\Resources\UserResource;
use App\Enums\UserRoleEnum;
use App\Interfaces\IAuthService;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class AuthService implements IAuthService {
    public function register(RegisterRequest $request): array {
        $fields = $request->validated();
        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'],
            'email' => $fields['email'],
            'role' => UserRoleEnum::STUDENT,
            'password' => Hash::make($fields['password']),
        ]);
        $token = $user->createToken($user->email)->plainTextToken;
        return [
            'user' => new UserResource($user),
            'token' => $token
        ];
    }
    public function login(LoginRequest $request): ?array {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return null;
        }
        $user = Auth::user();
        $token = $user->createToken($user->email)->plainTextToken;
        return [
            'user' => $user,
            'token' => $token,
        ];
    }
}