<?php

namespace App\Repositories;

use App\Http\Requests\ServiceLoginRequest;
use App\Models\Position;
use App\Models\User;
use App\Traits\HasError;
use Exception;
use Illuminate\Support\Collection;
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

    public function getDistance($consumer, $service): Collection
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
            ->where("from_consumer" , '=','whickle') //$consumer->username
            ->where("to_service" , '=','asa24') //$service->username
            ->get();
    }
}
