<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PubSubController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $id = rand(1,99999);
        $user = $request->user ?? 'susant';
        event(new MessageEvent($id, $user));
        return response()->json(['message' => 'index']);
    }

    public function postMessage(Request $request): JsonResponse
    {
        $id = rand(1,99999);
        $user = $request->user ?? 'susant';
        event(new MessageEvent($id, $user));
        return response()->json(['message' => 'postMessage']);
    }
}
