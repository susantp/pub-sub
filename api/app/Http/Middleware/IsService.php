<?php

namespace App\Http\Middleware;

use App\Enums\UserType;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IsService
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->input('type') == UserType::SERVICE->value) {
            return $next($request);
        }
        return response()->fail(__('auth.loginTypeError'));
    }
}
