<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Exam extends Model
{
    use HasFactory;
    const TABLE = 'exams';
    protected $table = self::TABLE; 
    protected $fillable = [
        'title',
        'datetime',
    ];
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }
    public function classroom(): BelongsTo
    {
        return $this->belongsTo(Classroom::class);
    }
}