<?php

namespace App\Enums;
enum TopicStatusEnum: int
{
    case FREE = 1;
    case PENDING = 2;
    case RESERVED = 3;

    public function label(): string
    {
        return match($this) {
            self::FREE => 'Slobodna',
            self::PENDING => 'Na čekanju',
            self::RESERVED => 'Rezervisana',
        };
    }
}