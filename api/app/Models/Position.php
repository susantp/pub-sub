<?php

namespace App\Models;

use App\Casts\GeoJSONFeatureSinglePoint;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Position extends Model
{
    use HasFactory;
    use HasUuids;


    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:s:i',
        'updated_at' => 'datetime:Y-m-d H:s:i',
        'longitude' => 'float',
        'latitude' => 'float',
        'latitude_single_feature' => GeoJSONFeatureSinglePoint::class
    ];
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
