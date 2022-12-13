<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class GeoJSONFeatureSinglePoint implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param Model $model
     * @param string $key
     * @param mixed $value
     * @param array $attributes
     * @return array
     */
    public function get($model, string $key, $value, array $attributes): array
    {
        return [
            'type' => "FeatureCollection",
            'features' => [
                [
                    'type' => 'Feature',
                    'properties' => collect($attributes)->only(['id']),
                    'geometry' => [
                        'type' => 'Point',
                        'coordinates' => [
                            (float)$attributes['longitude'],
                            (float)$attributes['latitude']
                        ]
                    ]
                ]
            ]
        ];
    }

    /**
     * Prepare the given value for storage.
     *
     * @param Model $model
     * @param string $key
     * @param mixed $value
     * @param array $attributes
     * @return array
     */
    public function set($model, string $key, $value, array $attributes): array
    {
        return [
            'latitude' => $value['features'[0]]['geometry']['coordinates'][1],
            'longitude' => $value['features'[0]]['geometry']['coordinates'][0],
        ];
    }
}
