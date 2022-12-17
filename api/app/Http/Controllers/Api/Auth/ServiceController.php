<?php

namespace App\Http\Controllers\Api\Auth;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceLoginRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ServiceController extends Controller
{
    public function __construct(protected UserRepository $userRepository)
    {
    }

    public function register(Request $request): Response
    {
        $s = $request->all();
        $userObject = $request->validate([
            'company' => ['string', 'required', 'min:8', 'max:200'],
            'email' => ['email', 'required', 'unique:users'],
            'password' => ['required', 'min:8'],
            'username' => ['required', 'unique:users', 'min:8', 'max:16'],
            'type' => ['required', new Enum(UserType::class)],
            'latitude' => ['required'],
            'longitude' => ['required']
        ]);
        $this->userRepository->createUser($userObject);
        if (!$this->userRepository->userCollection) {
            return $this->userRepository->getError();
        }
        return response()->ok(['user' => $this->userRepository->userCollection]);
    }

    public function login(ServiceLoginRequest $request): Response
    {
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->fail('Invalid credentials', SymfonyResponse::HTTP_UNAUTHORIZED);
        }
        $this->userRepository->updatePosition(Auth::user(), $request);
        if (!$this->userRepository->userCollection) {
            return $this->userRepository->getError();
        }
        $success['user'] = $this->userRepository->userCollection;
        return response()->ok($success);
    }

    public function logout(Request $request): Response
    {
        Auth::logout();
        return response()->ok('Logout Successfully.');
    }
}
