<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfessorSubject extends Model
{
    use HasFactory;
    const TABLE = 'professor_subjects';
    protected $table = self::TABLE; 
    protected $fillable = [
        'user_id',
        'subject_id',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }
}