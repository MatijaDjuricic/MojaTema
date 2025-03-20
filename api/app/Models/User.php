<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    const TABLE = 'users';
    protected $table = self::TABLE;
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
        'created_at',
    ];
    public function student(): HasOne
    {
        return $this->hasOne(Student::class);
    }
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }
}