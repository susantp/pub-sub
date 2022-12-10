<?php

namespace App\Enums;
enum UserRole: string
{
    case Service = "service";
    case consumer = "consumer";
}