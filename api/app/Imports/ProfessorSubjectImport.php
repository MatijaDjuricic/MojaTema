<?php

namespace App\Imports;

use App\Models\ProfessorSubject;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProfessorSubjectImport implements ToModel, WithHeadingRow
{
    public function model(array $row): ?ProfessorSubject
    {
        if (isset($row['user_id']) && isset($row['professor_id'])) {
            return new ProfessorSubject([
                'user_id' => $row['user_id'],
                'class_year_id' => $row['professor_id'],
            ]);
        } else {
            \Log::warning('Missing required data in row: ' . json_encode($row));
            return null;
        }
    }
}
