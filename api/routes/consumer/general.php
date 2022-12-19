<?php

use App\Http\Controllers\Api\ConsumerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(ConsumerController::class)
    ->group(function () {
        Route::post('searchService', 'searchService');
    });
