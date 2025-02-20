<?php

use App\Models\Topic;
use App\Models\User;
use App\Models\Subject;
use App\Models\Student;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(Topic::TABLE, function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->integer('status');
            $table->foreignIdFor(User::class, 'user_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Student::class, 'student_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Subject::class, 'subject_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists(Topic::TABLE);
    }
};