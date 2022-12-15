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
        'name',
        'email',
        'password',
        'username',
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

    public function newEloquentBuilder($query): SpatialBuilder
    {
        return new SpatialBuilder($query);
    }

    public function position(): HasMany
    {
        return $this
            ->hasMany(Position::class)
            ->orderBy('created_at', 'desc');
    }
}
