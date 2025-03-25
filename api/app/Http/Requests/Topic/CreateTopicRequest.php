<?php

namespace App\Http\Requests\Topic;

use Illuminate\Foundation\Http\FormRequest;
class CreateTopicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'professor_subject_id' => 'required|int',
            'student_id' => 'int|nullable'
        ];
    }
}