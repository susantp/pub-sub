<?php


use App\Http\Controllers\Api\Auth\ConsumerController;
use Illuminate\Support\Facades\Route;

Route::controller(ConsumerController::class)
    ->group(function () {
        Route::post('/login', 'login');
        Route::post('/register', 'register');
        Route::post('/logout', 'logout');
    });
