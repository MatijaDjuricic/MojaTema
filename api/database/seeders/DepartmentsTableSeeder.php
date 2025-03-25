<?php

namespace Database\Seeders;

use App\Enums\DepartmentEnum;
use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentsTableSeeder extends Seeder
{
    public function run(): void
    {
        Department::insert([
            ['title' => DepartmentEnum::SOCIAL_LANGUAGE->label()],
            ['title' => DepartmentEnum::NATURAL_MATHEMATICAL->label()],
            ['title' => DepartmentEnum::SPECIAL_COMPUTER_SKILLS->label()],
            ['title' => DepartmentEnum::SPECIAL_PHYSICS_SKILLS->label()],
        ]);
    }
}
