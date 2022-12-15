<?php

namespace App;

enum UserType: string
{
    case SERVICE = 'service';
    case CONSUMER = 'consumer';
}
