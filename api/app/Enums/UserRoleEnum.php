<?php

namespace App\Enums;
enum UserRoleEnum: int
{
    case SUPER_ADMIN = 1;
    case ADMIN = 2;
    case DIRECTOR = 3;
    case COORDINATOR = 4;
    case PROFESSOR = 5;
    case MENTOR = 6;
    case CLASS_SUPERVISOR = 7;
    case STUDENT = 8;
    case COMMITTEE_PRESIDENT = 9;
    case ACTIVE_GROUP_LEADER = 10;

    public function label(): string
    {
        return match($this) {
            self::SUPER_ADMIN => 'Super administrator',
            self::ADMIN => 'Administrator',
            self::DIRECTOR => 'Direktor',
            self::COORDINATOR => 'Koordinator',
            self::PROFESSOR => 'Profesor',
            self::MENTOR => 'Mentor',
            self::CLASS_SUPERVISOR => 'Odeljenski starešina',
            self::STUDENT => 'Učenik',
            self::COMMITTEE_PRESIDENT => 'Predsednik komisije',
            self::ACTIVE_GROUP_LEADER => 'Rukovodilac aktiva',
        };
    }
}