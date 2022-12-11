<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceLoginRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ServiceController extends Controller
{
    public function register(Request $request)
    {
        $userObject = $request->validate([
            'email' => ['email', 'required', 'unique:users'],
            'password' => ['required', 'min:8'],
            'username' => ['required', 'unique:users', 'min:8', 'max:16']
        ]);
        $user = $this->createUserAction($userObject);
        return response()->ok(['user' => $user]);
    }

    public function login(ServiceLoginRequest $request)
    {
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->fail('Invalid credentials', SymfonyResponse::HTTP_UNAUTHORIZED);
        }

        try {
            $user = Auth::user();
            $success['user'] = ['id' => $user->id, 'name' => $user->name, 'email' => $user->email, 'email_verified_at' => $user->email_verified_at];
            $success['message'] = 'Login Successfully';
            return response()->ok($success);
        } catch (Exception $exception) {
            return response()->fail($exception->getMessage());
        }
    }

    public function logout(): null
    {
        return null;
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
