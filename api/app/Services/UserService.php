<?php

namespace App\Services;

use App\Enums\UserRoleEnum;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Imports\UserImport;
use App\Interfaces\IUserService;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class UserService implements IUserService
{    
    public function getAllUsers(): JsonResource {
        return Cache::remember('users_all', 60, function () {
            return UserResource::collection(User::all());
        });
    }

    public function getUserById(int $id): JsonResource {
        $cacheKey = "user_{$id}";
        return Cache::remember($cacheKey, 60, function () use ($id) {
            $user = User::find($id);
            if (!$user) {
                throw new ModelNotFoundException('user not found.');
            }
            return UserResource::make($user);
        });
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

    public function createUser(CreateUserRequest $request): JsonResource {
        try {
            $fields = $request->validated();
            $user = User::create([
                'first_name' => $fields['first_name'],
                'last_name' => $fields['last_name'],
                'email' => $fields['email'],
                'role' => $fields['role'],
                'password' => Hash::make('123')
            ]);
            Cache::forget('users_all');
            return UserResource::make($user);
        } catch (\Exception $e) {
            \Log::error('Error creating user: ' . $e->getMessage());
            throw new \Exception('Error creating user.');
        }
    }

    public function importUsers(Request $request): bool {
        $request->validate([
            'file' => 'required|mimes:xlsx,txt,csv|max:10240',
        ]);
        $file = $request->file('file');
        $path = $file->storeAs('imports', $file->getClientOriginalName());
        $fullPath = storage_path('app/public/' . $path);
        if (!file_exists($fullPath)) {
            throw new \Exception('File not found on server.');
        }
        try {
            switch ($file->getClientOriginalExtension()) {
                case 'xlsx':
                    Excel::import(new UserImport, $fullPath);
                    break;
                case 'csv':
                    Excel::import(new UserImport, $file);
                    break;
                default:
                    return false;
            }
            Cache::forget('users_all');
            return true;
        } catch (\Exception $e) {
            \Log::error('Error importing user: ' . $e->getMessage());
            throw new \Exception('Error importing user.');
        } finally {
            Storage::delete($path);
        }
    }

    public function updateUser(UpdateUserRequest $request, int $id): JsonResource {
        try {
            $user = User::find($id);
            $fields = $request->validated();
            $user->update($fields);
            Cache::forget("user_{$id}");
            Cache::forget('users_all');
            return UserResource::make($user);
        } catch (\Exception $e) {
            \Log::error('Error updating user: ' . $e->getMessage());
            throw new \Exception('Error updating user.');
        }
    }

    public function deleteUser(int $id): bool {
        try {
            $user = User::find($id);
            if (!$user) return false;
            $result = $user->delete();
            Cache::forget("user_{$id}");
            Cache::forget('users_all');
            return $result;
        } catch (\Exception $e) {
            \Log::error('Error deleting user: ' . $e->getMessage());
            throw new \Exception('Error deleting user.');
        }
    }
}