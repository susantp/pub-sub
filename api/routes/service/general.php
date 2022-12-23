<?php

use App\Http\Controllers\Api\Auth\ServiceController;
use Illuminate\Support\Facades\Route;

Route::controller(ServiceController::class)
    ->group(function () {
        Route::post('acceptConsumer', 'acceptConsumer');
    });
