<?php

use App\Models\Exam;
use App\Models\Subject;
use App\Models\ClassRoom;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(Exam::TABLE, function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->dateTime('datetime');
            $table->foreignIdFor(Subject::class, 'subject_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(ClassRoom::class, 'classroom_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists(Exam::TABLE);
    }
};