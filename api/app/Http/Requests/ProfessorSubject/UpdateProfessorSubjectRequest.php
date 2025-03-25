<?php

namespace App\Http\Requests\ProfessorSubject;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfessorSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'user_id' => 'int',
            'subject_id' => 'int',
        ];
    }
}
