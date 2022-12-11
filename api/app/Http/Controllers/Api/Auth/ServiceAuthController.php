<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceLoginRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ServiceAuthController extends Controller
{
    public function register(Request $request)
    {
        return response()->ok($request->all());
    }

    public function login(ServiceLoginRequest $request)
    {
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->fail('Invalid credentials', SymfonyResponse::HTTP_UNAUTHORIZED);
        }

        try {
            $user = Auth::user();
            $success['token'] = $user->createToken(str()->slug(config('app.name')))->plainTextToken;
            $success['user'] = ['id' => $user->id, 'name' => $user->name, 'email' => $user->email];
            $success['message'] = 'Login Successfully';
            return response()->ok($success);
        } catch (Exception $exception) {
            return response()->fail($exception->getMessage());
        }
    }
}
