<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceLoginRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ServiceController extends Controller
{
    public function register(Request $request): Response
    {
        $userObject = $request->validate([
            'email' => ['email', 'required', 'unique:users'],
            'password' => ['required', 'min:8'],
            'username' => ['required', 'unique:users', 'min:8', 'max:16']
        ]);
        $user = $this->createUserAction($userObject);
        return response()->ok(['user' => $user]);
    }

    public function login(ServiceLoginRequest $request): Response
    {
//        return response()->ok($request->all());
        $distance = null;
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->fail('Invalid credentials', SymfonyResponse::HTTP_UNAUTHORIZED);
        }
        if ($coords = $request->input('coords')) {
            try {
                $user = User::find(Auth::user()->id);
                $user->current_location = new Point((float)$coords['latitude'], (float)$coords['longitude']);
                $user->save();

                $distance = User::query()->whereDistance(
                    "current_location",
                    new Point(
                        (float)$coords['latitude'], (float)$coords['longitude']
                    ),
                    "<",
                    10
                );
            } catch (Exception $exception) {
                Log::debug($exception->getMessage());
            }
        }
        $user = Auth::user();
        $success['user'] = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'username' => $user->username,
            'email_verified_at' => $user->email_verified_at,
            'current_location' => $user->current_location,
            'distance' => $distance
        ];
        $success['message'] = 'Login Successfully';
        return response()->ok($success);
    }

    public function logout(Request $request): Response
    {
        Auth::logout();
        return response()->ok(['message' => 'Logout Successfully.']);
    }


    /***********************make factory and interface for these methods***************************************/
    public function createUserAction($userObject)
    {
        $emailExploded = explode('@', $userObject['email']);
        $password = Hash::make($emailExploded[0]);
        $userObject['name'] = $emailExploded[0];
        $userObject['password'] = $password;
        $user = User::create($userObject);
        return $user;
    }
    /**************************************************************/
}
