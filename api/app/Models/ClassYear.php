<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClassYear
{
    use HasFactory;
    const TABLE = 'class_years';
    protected $table = self::TABLE; 
    protected $fillable = [
        'title',
    ];
}