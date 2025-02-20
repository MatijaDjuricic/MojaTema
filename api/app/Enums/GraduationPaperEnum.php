<?php

namespace App\Enums;
enum GraduationPaperEnum: int
{
    case SENT = 1;
    case UNDER_REVIEW = 2;
    case NEEDS_CORRECTION = 3;
    case APPROVED_FOR_PRINTING = 4;

    public function label(): string
    {
        return match($this) {
            self::SENT => 'Poslat',
            self::UNDER_REVIEW => 'Na pregledanju',
            self::NEEDS_CORRECTION => 'Potrebno korigovanje',
            self::APPROVED_FOR_PRINTING => 'Odobren za štampu',
        };
    }
}