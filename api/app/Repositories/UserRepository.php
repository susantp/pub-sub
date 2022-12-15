<?php

namespace App\Repositories;

use App\Models\Position;
use App\Models\User;
use App\Traits\HasError;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserRepository
{
    use HasError;

    public function __construct(protected User $userModel, protected Position $positionModel, public mixed $userCollection = null)
    {

    }

    public function createUser($userObject): void
    {
        $user = null;
        $emailExploded = explode('@', $userObject['email']);
        $password = Hash::make($emailExploded[0]);
        $userObject['name'] = $emailExploded[0];
        $userObject['password'] = $password;
        try {
            $this->userCollection = $this->userModel->create($userObject);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            $this->setError($exception->getMessage(), $exception->getCode());
        }
    }

    public function findById($id): void
    {
        $this->userCollection = $this->userModel->find($id);
    }

    public function updatePosition(User $user, array $coords): void
    {
        try {
            $this->positionModel->latitude = $coords['latitude'];
            $this->positionModel->longitude = $coords['longitude'];
            $this->positionModel->user()->associate($user);
            $this->positionModel->save();
            $this->userCollection = $user;
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            $this->setError($exception->getMessage(), $exception->getCode());
        }
    }
}