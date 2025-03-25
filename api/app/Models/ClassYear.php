<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassYear extends Model
{
    use HasFactory;
    const TABLE = 'class_years';
    protected $table = self::TABLE; 
    protected $fillable = [
        'title',
    ];
}