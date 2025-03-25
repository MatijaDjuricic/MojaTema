<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(User::TABLE, function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('email', 255)->unique();
            $table->string('password', 255);
            $table->unsignedInteger('role');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists(User::TABLE);
    }
};