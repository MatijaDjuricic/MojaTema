<?php

namespace Database\Seeders;

use App\Enums\ClassYearEnum;
use App\Models\ClassYear;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassYearsTableSeeder extends Seeder
{
    public function run(): void
    {
        ClassYear::insert([
            ['title' => ClassYearEnum::IV->label()],
            ['title' => ClassYearEnum::III->label()],
        ]);
    }
}
