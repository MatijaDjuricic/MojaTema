<?php

namespace App\Enums;
enum ClassYearEnum: int
{
    case IV = 1;
    case III = 2;

    public function label(): string
    {
        return match($this) {
            self::IV => 'IV godina',
            self::III => 'III godina',
        };
    }
}