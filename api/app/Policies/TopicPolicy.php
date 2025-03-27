<?php

namespace App\Policies;

use App\Enums\TopicStatusEnum;
use App\Enums\UserRoleEnum;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TopicPolicy
{
    public function create(User $user): Response {
        return in_array($user->role, [
            UserRoleEnum::PROFESSOR->value,
            UserRoleEnum::ADMIN->value,
            UserRoleEnum::SUPER_ADMIN->value
            ]) ? Response::allow()
            : Response::deny('You do not have permission to create a topic');
    }

    public function update(User $user, Topic $topic): Response {
        return in_array($user->role, [
            UserRoleEnum::ADMIN->value,
            UserRoleEnum::SUPER_ADMIN->value
            ]) || $user->id == $topic->user_id
            ? Response::allow()
            : Response::deny('You do not own this topic');
    }

    public function updateStatusByStudent(User $user, Topic $topic): Response {
        return in_array($user->role, [
            UserRoleEnum::STUDENT->value,
            UserRoleEnum::ADMIN->value,
            UserRoleEnum::SUPER_ADMIN->value
            ]) || $topic->status != TopicStatusEnum::RESERVED
            ? Response::allow()
            : Response::deny('You do not have permission to update topic status');
    }

    public function updateStatusByProfessor(User $user, Topic $topic): Response
    {
        return in_array($user->role, [UserRoleEnum::ADMIN->value, UserRoleEnum::SUPER_ADMIN->value])
            || ($user->role == UserRoleEnum::PROFESSOR->value && $topic->status != TopicStatusEnum::FREE)
            ? Response::allow()
            : Response::deny('You do not have permission to update topic status');
    }

    public function delete(User $user, Topic $topic): Response{
        return in_array($user->role, [
            UserRoleEnum::ADMIN->value,
            UserRoleEnum::SUPER_ADMIN->value
            ]) || $user->id == $topic->professor_subject->user_id
            ? Response::allow()
            : Response::deny('You do not have permission to delete this topic');
    }
}