<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class ClassRoom extends Model
{
    use HasFactory;
    const TABLE = 'classrooms';
    protected $table = self::TABLE;
    protected $fillable = [
        'classroom_number',
        'capacity',
    ];
}