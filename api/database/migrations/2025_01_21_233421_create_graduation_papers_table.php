<?php

use App\Models\GraduationPaper;
use App\Models\Topic;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(GraduationPaper::TABLE, function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Topic::class, 'topic_id')->constrained()->cascadeOnDelete();
            $table->integer('status');
            $table->timestamp('submission_date');
            $table->timestamp('approval_date')->nullable();
            $table->string('file_path');
            $table->timestamps(); 
        });
    }
    public function down(): void
    {
        Schema::dropIfExists(GraduationPaper::TABLE);
    }
};