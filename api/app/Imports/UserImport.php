<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UserImport implements ToModel, WithHeadingRow
{
    public function model(array $row): ?User
    {
        if (isset($row['first_name']) && isset($row['last_name']) && isset($row['email']) && isset($row['role'])) {
            if (filter_var($row['email'], FILTER_VALIDATE_EMAIL) === false) {
                \Log::warning("Invalid email detected: " . $row['email']);
                return null;
            }
            return new User([
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'email' => $row['email'],
                'role' => intval($row['role']),
                'password' => Hash::make('123'),
            ]);
        } else {
            \Log::error('Missing required data in row: ' . json_encode($row));
            return null;
        }
    }
}