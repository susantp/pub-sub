<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
            ->nearByService($validated['latitude'], $validated['longitude'])
            ->paginate(20);
        return response()->ok($services);
    }

    public function calculateDistance(Request $request)
    {
        $toCustomer = User::all()[0]->username;
        $getDistance = $this->userRepository->calculateDistance($request->user()->username, $toCustomer)->first();
        return response()->ok($getDistance);
    }
}
