<?php

namespace App\Http\Requests\ProfessorSubject;

use Illuminate\Foundation\Http\FormRequest;

class CreateProfessorSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'user_id' => 'required|int',
            'subject_id' => 'required|int',
        ];
    }
}
