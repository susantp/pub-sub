<?php

namespace App\Http\Controllers\Api\Auth;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ConsumerController extends Controller
{
    public function register(Request $request): Response
    {
        $userObject = $request->validate([
            'consumer' => ['nullable', 'string'],
            'email' => ['email', 'required', 'unique:users'],
            'password' => ['required', 'min:8'],
            'username' => ['required', 'unique:users', 'min:8', 'max:16'],
            'type' => ['required', new Enum(UserType::class)],
            'latitude' => ['required'],
            'longitude' => ['required']
        ]);
        $user = $this->createUserAction($userObject);
        return response()->ok(['user' => $user]);
    }

    public function login(Request $request): Response
    {
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->fail('Invalid credentials', SymfonyResponse::HTTP_UNAUTHORIZED);
        }

        try {
            $request->session()->regenerate();
            $user = Auth::user();
            $success['user'] = ['name' => $user->name, 'email' => $user->email, 'email_verified_at' => $user->email_verified_at];
            $success['message'] = 'Login Successfully';
            return response()->ok($success);
        } catch (Exception $exception) {
            return response()->fail($exception->getMessage());
        }
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
