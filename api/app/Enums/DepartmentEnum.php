<?php

namespace App\Enums;
enum DepartmentEnum: int
{
    case SOCIAL_LANGUAGE = 1;
    case NATURAL_MATHEMATICAL = 2;
    case SPECIAL_COMPUTER_SKILLS = 3;
    case SPECIAL_PHYSICS_SKILLS = 4;

    public function label(): string
    {
        return match($this) {
            self::SOCIAL_LANGUAGE => 'Društveno-jezički',
            self::NATURAL_MATHEMATICAL => 'Prirodno-matematički',
            self::SPECIAL_COMPUTER_SKILLS => 'Učenici sa posebnim sposobnostima za računarsvo i informatiku',
            self::SPECIAL_PHYSICS_SKILLS => 'Učenici sa posebnim sposobnostima za fiziku',
        };
    }
}