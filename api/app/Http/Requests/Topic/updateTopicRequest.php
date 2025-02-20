<?php

namespace App\Http\Requests\Topic;

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
        ];
    }
}