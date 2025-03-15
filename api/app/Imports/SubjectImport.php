<?php

namespace App\Imports;

use App\Models\Subject;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SubjectImport implements ToModel, WithHeadingRow
{
    public function model(array $row): ?Subject
    {
        if (isset($row['title']) && isset($row['class_year_id'])) {
            return new Subject([
                'title' => $row['title'],
                'class_year_id' => $row['class_year_id']
            ]);
        } else {
            \Log::warning('Missing required data in row: ' . json_encode($row));
            return null;
        }
    }
}