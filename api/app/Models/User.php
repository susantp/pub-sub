<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Casts\GeoJSONFeatureSinglePoint;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;
use MatanYadaev\EloquentSpatial\SpatialBuilder;

/**
 * @method static SpatialBuilder query()
 */
class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use HasUuids;

    protected $casts = [
        'email_verified_at' => 'datetime:Y-m-d H:s:i',
        'created_at' => 'datetime:Y-m-d H:s:i',
        'updated_at' => 'datetime:Y-m-d H:s:i',
        'longitude' => 'float',
        'latitude' => 'float',
        'latitude_single_feature' => GeoJSONFeatureSinglePoint::class
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company',
        'name',
        'email',
        'password',
        'username',
        'type',
        'latitude',
        'longitude'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

//    public function newEloquentBuilder($query): SpatialBuilder
//    {
//        return new SpatialBuilder($query);
//    }

    public function scopeCalculateDistance($query, $from_consumer, $to_service)
    {
        return $query->table('users as a')
            ->join('users as b', 'a.username', '<>', 'b.username')
            ->select([
                "a.username as from_consumer",
                "b.username as to_service",
                DB::raw('111.111 *
    DEGREES(ACOS(LEAST(1.0, COS(RADIANS(a.latitude))
         * COS(RADIANS(b.latitude))
         * COS(RADIANS(a.longitude - b.longitude))
         + SIN(RADIANS(a.latitude))
         * SIN(RADIANS(b.latitude))))) AS distance_in_km')
            ])
            ->where("from_consumer", '=', $from_consumer) //$consumer->username
            ->where("to_service", '=', $to_service); //$service->username
    }
}
