<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    use HasFactory;
    const TABLE = 'students';
    protected $table = self::TABLE;
    protected $fillable = [
        'status',
        'mandatory_grade',
        'elective_grade',
        'graduation_grade',
        'user_id'
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function classYear(): BelongsTo
    {
        return $this->belongsTo(ClassYear::class);
    }
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}