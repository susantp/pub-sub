<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceLoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceAuthController extends Controller
{
    public function register(Request $request)
    {
        return response()->ok($request->all());
    }

    public function login(ServiceLoginRequest $request)
    {
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->fail('Unauthorized', 401);
        }
        $user = User::where('email', $request->email)->first();
        return response()->ok($request->all());
    }
}