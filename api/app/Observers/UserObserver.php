<?php

namespace App\Observers;

use App\Enums\ClassYearEnum;
use App\Enums\DepartmentEnum;
use App\Enums\StudentStatusEnum;
use App\Enums\UserRoleEnum;
use App\Models\User;
use App\Models\Student;

class UserObserver
{
    private function syncStudentTable(User $user)
    {
        if ($user->role == UserRoleEnum::STUDENT->value) {
            Student::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'status' => StudentStatusEnum::ACTIVE->value,
                    'class_year_id' => ClassYearEnum::IV->value,
                    'department_id' => DepartmentEnum::SPECIAL_COMPUTER_SKILLS->value,
                    'mandatory_grade' => null,
                    'elective_grade' => null,
                    'graduation_grade' => null,
                ]
            );
        }
    }
    
    public function created(User $user): void
    {
        $this->syncStudentTable($user);
    }

    public function updated(User $user): void
    {
        $this->syncStudentTable($user);
    }

    public function deleted(User $user): void
    {
        Student::where('user_id', $user->id)->delete();
    }

    public function restored(User $user): void
    {
        //
    }

    public function forceDeleted(User $user): void
    {
        //
    }
}
