<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class ResponseMacroServiceProvider extends ServiceProvider
{
    public function register(): void
    {

    }

    public function boot(): void
    {
        Response::macro('ok', function ($data, $statusCode = 200) {
            return Response::make(
                [
                    ['errors' => false],
                    ['data' => $data],
                ],
                $statusCode ?? 200
            )
                ->header('Content-Type', 'application/json');
        });
        Response::macro('fail', function ($data, $statusCode = 500) {
            return Response::make(
                [
                    ['errors' => true],
                    ['message' => $data],
                ],
                $statusCode
            )
                ->header('Content-Type', 'application/json');
        });
    }
}
