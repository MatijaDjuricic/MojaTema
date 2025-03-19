<?php

namespace App\Services;

use App\Models\User;
use App\Http\Resources\UserResource;
use App\Enums\UserRoleEnum;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Interfaces\IAuthService;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class AuthService implements IAuthService
{
    public function me(Request $request): JsonResource {
        return Cache::remember('me', 60, fn() => UserResource::make($request->user()));
    }

    public function register(RegisterRequest $request): JsonResource {
        $fields = $request->validated();
        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'],
            'email' => $fields['email'],
            'role' => UserRoleEnum::STUDENT,
            'password' => Hash::make($fields['password']),
        ]);
        $token = $user->createToken($user->email)->plainTextToken;
        Cache::forget('me');
        return JsonResource::make([
            'user' => UserResource::make($user),
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request): JsonResource {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            throw new AuthorizationException('Bad credentials, login failed');
        }
        $user = $request->user();
        $token = $user->createToken($user->email)->plainTextToken;
        Cache::forget('me');
        return JsonResource::make([
            'user' => UserResource::make($user),
            'token' => $token
        ]);
    }

    public function changePassword(ChangePasswordRequest $request): JsonResource {
        $user = $request->user();
        if (!Hash::check($request->current_password, $user->password)) {
            throw new BadRequestException('Current password is incorrect');
        }
        $user->password = Hash::make($request->new_password);
        $user->save();
        Cache::forget('me');
        return JsonResource::make([
            'message' => 'Password changed successfully'
        ]);
    }
}