<?php

namespace App\Repositories;

use App\Models\Position;
use App\Models\User;
use App\Traits\HasError;
use Illuminate\Support\Facades\DB;

class PositionRepository
{
    use HasError;

    public function __construct(protected Position $positionModel, protected User $user)
    {
    }

    public function getDistance($from, $to, $user)
    {
        /**
         *SELECT a.user_id AS from_consumer, b.user_id AS to_service,
        111.1111 *
        DEGREES(ACOS(LEAST(1.0, COS(RADIANS(a.latitude))
         * COS(RADIANS(b.latitude))
         * COS(RADIANS(a.longitude) - RADIANS(b.longitude))
        + SIN(RADIANS(a.latitude))
         * SIN(RADIANS(b.latitude))))) AS distance_in_km
        FROM positions AS a
        JOIN positions AS b ON a.id <> b.id
        WHERE a.user_id = '97fd404e-44ff-421e-9796-500fe52d2274' AND b.user_id = '97fd404e-4ddd-476c-87ac-c8f6997578f2';
         */
    }
}