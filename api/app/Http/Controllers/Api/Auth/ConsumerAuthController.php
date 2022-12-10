<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ConsumerLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ConsumerAuthController extends Controller
{
    public function register(Request $request)
    {
        return response()->ok($request->all());
    }

    public function login(ConsumerLoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->fail('Invalid credentials', SymfonyResponse::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();
//        $success['token'] = $user->createToken(str()->slug(config('app.name')))->plainTextToken;
        $success['user'] = $user->select(['id', 'name', 'email'])->first();
        $success['message'] = 'Login Successfully';
        return response()->ok($success);
    }
}
