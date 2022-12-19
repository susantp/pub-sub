<?php

namespace App\Repositories;

use App\Enums\UserType;
use App\Http\Requests\ServiceLoginRequest;
use App\Models\User;
use App\Traits\HasError;
use Exception;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserRepository
{
    use HasError;

    public function __construct(protected User $userModel, public mixed $userCollection = null)
    {
    }

    public function createUser($userObject): void
    {
        $emailExploded = explode('@', $userObject['email']);
        $password = Hash::make($emailExploded[0]);
        $userObject['name'] = $emailExploded[0];
        $userObject['password'] = $password;
        try {
            $this->userCollection = $this->userModel->query()->create($userObject);
        } catch (Exception $exception) {
            Log::debug('while register ' . $exception->getMessage());
            $this->setError($exception->getMessage(), 404);
        }
    }

    public function findById($id): void
    {
        $this->userCollection = $this->userModel->query()->where('id', $id)->first();
    }

    public function updatePosition($user, ServiceLoginRequest $serviceLoginRequest): void
    {
        try {
            $user = User::where('id', $user->id)->first();
            $user->latitude = $serviceLoginRequest->latitude;
            $user->longitude = $serviceLoginRequest->longitude;
            $user->save();
            $this->userCollection = $user;
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            $this->setError($exception->getMessage(), $exception->getCode());
        }
    }

    public function calculateDistance(string $fromUsername, string $toUsername): QueryBuilder
    {
        return DB::table('users as a')
            ->join('users as b', 'a.username', '<>', 'b.username')
            ->select([
                'a.username as from_consumer',
                'b.username as to_service',
                DB::raw('111.111 *
    DEGREES(ACOS(LEAST(1.0, COS(RADIANS(a.latitude))
         * COS(RADIANS(b.latitude))
         * COS(RADIANS(a.longitude - b.longitude))
         + SIN(RADIANS(a.latitude))
         * SIN(RADIANS(b.latitude))))) AS distance_in_km')
            ])
            ->where("a.username", '=', $fromUsername) //$consumer->username
            ->where("b.username", '=', $toUsername);//$service->username
    }

    public function nearByService(float $latitude, float $longitude, int $radius = 10): EloquentBuilder
    {
        $kiloMeterVar = 6371;
        $mileVar = 3959;
        return User::select(
            [
                "id",
                "username",
                "email",
                "name",
                "type",
                DB::raw("$kiloMeterVar * 
                acos(cos(radians($latitude)) *
                    cos(radians(latitude)) *
                    cos(radians(longitude) -
                        radians($longitude)) +
                    sin(radians($latitude)) *
                    sin(radians(latitude)))
             AS distance")
            ]
        )
            ->having('distance', '<=', $radius)
            ->where('type', '=', UserType::SERVICE->value)
            ->orderBy('distance', 'desc');
    }
}
