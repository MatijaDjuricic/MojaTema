<?php

use App\Enums\StudentStatusEnum;
use App\Models\ClassYear;
use App\Models\Student;
use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create(Student::TABLE, function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'user_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(ClassYear::class, 'class_year_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Department::class, 'department_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('status');
            $table->string('mandatory_grade')->nullable();
            $table->string('elective_grade')->nullable();
            $table->string('graduation_grade')->nullable();
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists(Student::TABLE);
    }
};