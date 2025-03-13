<?php

namespace App\Http\Requests\User;

use App\Enums\UserRoleEnum;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|string',
            'role' => 'required|int|in:' . implode(',', [
                UserRoleEnum::SUPER_ADMIN->value,
                UserRoleEnum::ADMIN->value,
                UserRoleEnum::DIRECTOR->value,
                UserRoleEnum::COORDINATOR->value,
                UserRoleEnum::PROFESSOR->value,
                UserRoleEnum::MENTOR->value,
                UserRoleEnum::CLASS_SUPERVISOR->value,
                UserRoleEnum::STUDENT->value,
                UserRoleEnum::COMMITTEE_PRESIDENT->value,
                UserRoleEnum::ACTIVE_GROUP_LEADER->value,
            ]),
        ];
    }
}