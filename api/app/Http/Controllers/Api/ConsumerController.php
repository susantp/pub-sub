<?php

namespace App\Http\Controllers\Api;

use App\Events\Consumer\SearchEvent;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class ConsumerController extends Controller
{
    public function __construct(private readonly UserRepository $userRepository)
    {
    }

    public function searchService(Request $request): Response
    {
        $validated = $request->validate([
            'latitude' => ['required'],
            'longitude' => ['required'],
            'type' => ['required', 'string']
        ]);
        $services = $this
            ->userRepository
            ->nearByService($validated['latitude'], $validated['longitude'], 10);

//        Log::debug(gettype($request->user()));
        SearchEvent::dispatch($request->user());
        return response()->ok($services->paginate(20));
    }

    public function calculateDistance(Request $request)
    {
        $toCustomer = User::all()[0]->username;
        $getDistance = $this->userRepository->calculateDistance($request->user()->username, $toCustomer)->first();
        return response()->ok($getDistance);
    }
}
