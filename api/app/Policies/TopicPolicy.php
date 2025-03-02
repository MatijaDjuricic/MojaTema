<?php

namespace App\Policies;

use App\Enums\TopicStatusEnum;
use App\Enums\UserRoleEnum;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Auth\Access\Response;
class TopicPolicy {
    public function create(User $user): Response {
        if ($user->role == UserRoleEnum::PROFESSOR->value) return Response::allow();
        return Response::deny('You do not have permission to create a topic');
    }
    public function update(User $user, Topic $topic): Response {
        return $user->id == $topic->user_id ?
        Response::allow() : Response::deny('You do not own this topic');
    }
    public function updateStatusByStudent(User $user, Topic $topic): Response {
        if ($user->role == UserRoleEnum::STUDENT->value && $topic->status != TopicStatusEnum::RESERVED) return Response::allow();
        return Response::deny('You do not have permission to update topic status');
    }
    public function updateStatusByProfessor(User $user, Topic $topic): Response {
        if ($user->role == UserRoleEnum::PROFESSOR->value && $topic->status != TopicStatusEnum::FREE) return Response::allow();
        return Response::deny('You do not have permission to update topic status');
    }
    public function delete(User $user, Topic $topic): Response {
        return $user->id == $topic->user_id || $user->role == UserRoleEnum::ADMIN->value ?
        Response::allow() : Response::deny('You do not own this topic');
    }
}