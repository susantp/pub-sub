<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Position>
 */
class PositionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user = User::query()->pluck('id')->toArray();
        return [
            'user_id' => $user[array_rand($user)],
            'latitude' => fake()->latitude,
            'longitude' => fake()->longitude
        ];
    }
}
