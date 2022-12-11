<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ConsumerLoginRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ConsumerAuthController extends Controller
{
    public function register(ConsumerLoginRequest $request): Response
    {
        return response()->ok($request->all());
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
}
