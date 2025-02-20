<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Department extends Model
{
    use HasFactory;
    const TABLE = 'departments';
    protected $table = self::TABLE; 
    protected $fillable = [
        'title',
    ];
    public function profssor_subject(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}