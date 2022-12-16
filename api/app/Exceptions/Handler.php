<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (Throwable $e) {
            if ($e instanceof ValidationException) {
                return response()->fail($e->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            if ($e instanceof AuthenticationException) {
                return response()->fail($e->getMessage(), Response::HTTP_UNAUTHORIZED);
            }
            if ($e instanceof NotFoundHttpException) {
                return response()->fail($e->getMessage(), Response::HTTP_NOT_FOUND);
            }
            if ($e instanceof \HttpException) {
                return response()->fail($e->getMessage(), Response::HTTP_NOT_FOUND);
            }
            return response()->fail(class_basename($e) . ' Uncatched Error:  ' . $e->getMessage() . ' ' . $e->getCode(), 500);
        });
    }
}
