<?php

namespace App\Http\Requests\Topic;

use App\Enums\TopicStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
class updateTopicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'title' => 'string|min:3|max:255',
            'description' => 'string|min:5|max:255',
            'status' => 'int|in:' . implode(',', [
                TopicStatusEnum::FREE->value,
                TopicStatusEnum::PENDING->value,
                TopicStatusEnum::RESERVED->value
            ]),
            'professor_subject_id' => 'required|int',
            'student_user_id' => 'int|nullable'
        ];
    }
}