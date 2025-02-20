<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GraduationPaper extends Model
{
    use HasFactory;

    const TABLE = 'graduation_papers';
    protected $table = self::TABLE;

    protected $fillable = [
        'status',
        'submission_date',
        'approval_date',
        'file_path',
    ];

    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }
}