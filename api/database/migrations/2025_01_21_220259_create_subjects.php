<?php

use App\Models\ClassYear;
use App\Models\Subject;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(Subject::TABLE, function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignIdFor(ClassYear::class, 'class_year_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists(Subject::TABLE);
    }
};