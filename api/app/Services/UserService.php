<?php

namespace App\Services;

use App\Enums\UserRoleEnum;
use App\Http\Resources\UserResource;
use App\Interfaces\IUserService;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Resources\Json\JsonResource;
class UserService implements IUserService {
    public function getAllUsers(): JsonResource {
        try {
            return UserResource::collection(User::all());
        } catch (\Exception $e) {
            \Log::error('Error fetching all users: ' . $e->getMessage());
            throw new \Exception('Error fetching users.');
        }
    }
    public function getUserById(int $id): JsonResource {
        try {
            $user = User::find($id);
            if (!$user) {
                throw new ModelNotFoundException('user not found.');
            }
            return UserResource::make($user);
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (\Exception $e) {
            \Log::error('Error fetching user by ID: ' . $e->getMessage());
            throw new \Exception('Error fetching user by ID.');
        }
    }
    public function getChatAvailableUsers(): JsonResource {
        try {
            $topic = Topic::with(['professor', 'student']);
            $users = [];
            if (auth()->user()->role == UserRoleEnum::STUDENT->value) {
                $data = $topic
                    ->orWhereHas('student', function($q)  {
                        $q->where('user_id', auth()->user()->id);
                    })->get();
                $users = UserResource::collection($data->pluck('professor'));
            }
            else if (auth()->user()->role == UserRoleEnum::PROFESSOR->value) {
                $data = $topic
                    ->whereNotNull('student_id')
                    ->where('user_id', auth()->user()->id)->get();
                $users = UserResource::collection($data->pluck('student.user'));
            }
            return JsonResource::collection($users);
        } catch (\Exception $e) {
            \Log::error('Error updating topic status: ' . $e->getMessage());
            throw new \Exception('Error updating topic status.');
        }
    }
}