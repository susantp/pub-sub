<?php

use App\Http\Controllers\Api\Auth\ConsumerAuthController;
use App\Http\Controllers\Api\Auth\ServiceAuthController;
use Illuminate\Support\Facades\Route;

Route::namespace('consumer')->prefix('consumer')->group(function () {
    Route::post('/login', [ConsumerAuthController::class, 'login']);
});


Route::namespace('service')->prefix('service')->group(function () {
    Route::post('/login', [ServiceAuthController::class, 'login']);
});
