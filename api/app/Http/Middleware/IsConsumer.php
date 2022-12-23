<?php

namespace App\Http\Middleware;

use App\Enums\UserType;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IsConsumer
{
    public function handle(Request $request, Closure $next)
    {
        Log::debug($request->input('type'));
        if ($request->input('type') == UserType::CONSUMER->value) {
            return $next($request);
        }
        return response()->fail(__('auth.loginTypeError'));
    }
}
