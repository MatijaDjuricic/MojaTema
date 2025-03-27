<?php

namespace App\Imports;

use App\Models\Topic;
use App\Enums\TopicStatusEnum;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
class TopicImport implements ToModel, WithHeadingRow
{
    public function model(array $row): ?Topic
    {
        if (
            isset($row['title']) && isset($row['description']) &&
            isset($row['professor_subject_id'])
        ) {
            return new Topic([
                'title' => $row['title'],
                'description' => $row['description'],
                'professor_subject_id' => $row['professor_subject_id'],
                'student_id' => isset($row['student_id']) ? $row['student_id'] : null,
                'status' => isset($row['student_id']) ? TopicStatusEnum::PENDING->value : TopicStatusEnum::FREE->value,
            ]);
        } else {
            \Log::warning('Missing required data in row: ' . json_encode($row));
            return null;
        }
    }
}