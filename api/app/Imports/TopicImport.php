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
        if (isset($row['title']) && isset($row['description']) && isset($row['subject_id'])) {
            return new Topic([
                'title' => $row['title'],
                'description' => $row['description'],
                'subject_id' => $row['subject_id'],
                'status' => TopicStatusEnum::FREE->value,
                'user_id' => auth()->user()->id,
                'student_id' => null,
            ]);
        } else {
            \Log::warning('Missing required data in row: ' . json_encode($row));
            return null;
        }
    }
}