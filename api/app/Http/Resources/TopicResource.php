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
            'subject' => [
                'id' => $this->subject_id,
                'title' => $this->subject->title,
            ],
            'professor' => [
                'userId' => $this->user_id,
                'firstName' => $this->professor->first_name ?? null,
                'lastName' => $this->professor->last_name ?? null,
            ],
            'student' => $this->student ? [
                'id' => $this->student_id,
                'userId' => $this->student->user->id,
                'firstName' => $this->student->user->first_name ?? null,
                'lastName' => $this->student->user->last_name ?? null,
            ] : null,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}