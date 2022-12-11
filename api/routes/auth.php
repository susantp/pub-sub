<?php


use App\Http\Controllers\Api\Auth\ConsumerController;
use App\Http\Controllers\Api\Auth\ServiceController;
use Illuminate\Support\Facades\Route;

Route::controller(ConsumerController::class)
    ->prefix('consumer')
    ->group(function () {
        Route::post('/login', 'login');
        Route::post('/register', 'register');
        Route::post('/logout', 'logout');
    });

Route::controller(ServiceController::class)
    ->prefix('service')
    ->group(function () {
        Route::post('/login', 'login');
        Route::post('/register', 'register');
        Route::post('/logout', 'logout');
    });
