<?php
use App\Models\ClassRoom;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create(ClassRoom::TABLE, function (Blueprint $table) {
            $table->id();
            $table->integer("classroom_number");
            $table->integer("capacity");
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists(ClassRoom::TABLE);
    }
};