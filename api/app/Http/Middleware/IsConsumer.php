<?php

namespace App\Http\Middleware;

use App\Enums\UserType;
use Closure;
use Illuminate\Http\Request;

class IsConsumer
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->input('type') == UserType::CONSUMER->value) {
            return $next($request);
        }
        return response()->fail(__('auth.loginTypeError'));
    }
}
