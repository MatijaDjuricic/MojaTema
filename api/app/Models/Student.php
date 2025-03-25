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
        'user_id',
        'class_year_id',
        'department_id',
        'mandatory_grade',
        'elective_grade',
        'graduation_grade'
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function class_year(): BelongsTo
    {
        return $this->belongsTo(ClassYear::class);
    }
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}