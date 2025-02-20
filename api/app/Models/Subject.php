<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subject extends Model
{
    use HasFactory;
    const TABLE = 'subjects';
    protected $table = self::TABLE;
    protected $fillable = [
        'id',
        'title',
        'class_year_id'
    ];
    public function classYear(): BelongsTo
    {
        return $this->belongsTo(ClassYear::class);
    }
}