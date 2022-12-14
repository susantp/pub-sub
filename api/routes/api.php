<?php

use App\Http\Controllers\PubSubController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->ok(['user' => $request->user()]);
});
Route::get('socket', [PubSubController::class, 'index']);
Route::post('post-message', [PubSubController::class, 'postMessage']);
