<?php

namespace App\Http\Requests\Topic;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTopicStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => 'required|int|in:' . implode(',', [
                TopicStatusEnum::FREE->value,
                TopicStatusEnum::PENDING->value,
                TopicStatusEnum::RESERVED->value
            ]),
        ];
    }
}