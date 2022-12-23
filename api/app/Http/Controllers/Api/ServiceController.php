<?php

namespace App\Http\Controllers\Api;

use App\Events\Consumer\SearchEvent;
use App\Events\Service\RequestAccpetedEvent;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    public function acceptConsumer(Request $request): Response
    {
        RequestAccpetedEvent::dispatch($request->user());
        return response()->ok([]);
    }
}
