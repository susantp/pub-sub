<?php

namespace App\Enums;

enum UserType: string
{
    case SERVICE = "service";
    case CONSUMER = "consumer";
}
