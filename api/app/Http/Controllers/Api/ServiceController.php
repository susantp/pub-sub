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
    public function __construct(private readonly UserRepository $userRepository)
    {
    }

    public function acceptConsumer(Request $request): Response
    {

        RequestAccpetedEvent::dispatch($request->user());
        return response()->ok([]);
    }

    public function calculateDistance(Request $request)
    {
        $toCustomer = User::all()[0]->username;
        $getDistance = $this->userRepository->calculateDistance($request->user()->username, $toCustomer)->first();
        return response()->ok($getDistance);
    }
}
