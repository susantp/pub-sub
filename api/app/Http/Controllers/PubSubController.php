<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use Illuminate\Http\Request;

class PubSubController extends Controller
{
    public function index(Request $request)
    {
        $id = rand(1,99999);
        $user = $request->user ?? 'susant';
        $message = $request->message ?? 'hello';
        event(new MessageEvent($id, $user, $message));
        return response()->json(['message' => 'index']);
    }

    public function postMessage(Request $request)
    {
        $id = rand(1,99999);
        $user = $request->user ?? 'susant';
        $message = $request->message ?? 'hello';
        event(new MessageEvent($id, $user, $message));
        return response()->json(['message' => 'postMessage']);
    }
}
