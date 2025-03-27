<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class TopicResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'professor_subject_id' => $this->professor_subject_id,
            'subject' => [
                'id' => $this->professor_subject->subject_id,
                'title' => $this->professor_subject->subject->title,
            ],
            'professor' => [
                'userId' => $this->professor_subject->user_id,
                'firstName' => $this->professor_subject->user->first_name ?? null,
                'lastName' => $this->professor_subject->user->last_name ?? null,
                'email' => $this->professor_subject->user->email ?? null,
            ],
            'student' => $this->student ? [
                'id' => $this->student_id,
                'userId' => $this->student->user->id,
                'firstName' => $this->student->user->first_name ?? null,
                'lastName' => $this->student->user->last_name ?? null,
                'email' => $this->student->user->email ?? null,
            ] : null,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}