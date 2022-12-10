<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConsumerAuthController extends Controller
{
    public function login(Request $request)
    {
        return response()->json([$request->all()]);
    }
}