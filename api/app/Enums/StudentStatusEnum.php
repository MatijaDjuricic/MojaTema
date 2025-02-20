<?php

namespace App\Enums;
enum StudentStatusEnum: int
{
    case ACTIVE = 1;
    case ARCHIVED = 2;

    public function label(): string
    {
        return match($this) {
            self::ACTIVE => 'Aktivan',
            self::ARCHIVED => 'Arhiviran',
        };
    }
}