<?php

use App\Models\Department;
use App\Models\ProfessorSubject;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(Department::TABLE, function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignIdFor(ProfessorSubject::class, 'professor_subject_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists(Department::TABLE);
    }
};