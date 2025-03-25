<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Topic extends Model
{
    use HasFactory;
    
    const TABLE = 'topics';
    protected $table = self::TABLE;
    
    protected $fillable = [
        'title',
        'description',
        'status',
        'professor_subject_id',
        'student_id'
    ];

    public function professor_subject(): BelongsTo
    {
        return $this->belongsTo(ProfessorSubject::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}