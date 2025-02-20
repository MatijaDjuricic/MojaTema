<?php

namespace App\DTO;

class TopicDto {
    public function __construct(
        public string $title,
        public string $description,
        public int $status,
        public int $subject_id,
        public int $user_id,
        public int $student_id,
    ) {} 
}