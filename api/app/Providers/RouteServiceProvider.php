<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
            $this->mapConsumerRoutes();
            $this->mapServiceRoutes();
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }

    protected function mapServiceRoutes()
    {
        Route::middleware(['api', 'isService'])
            ->prefix('api/auth/service')
            ->group(base_path('routes/service/auth.php'));
    }

    protected function mapConsumerRoutes()
    {
        Route::middleware(['api', 'isConsumer'])
            ->prefix('api/auth/consumer')
            ->group(base_path('routes/consumer/auth.php'));

        Route::middleware(['api', 'isConsumer'])
            ->prefix('api/consumer')
            ->group(base_path('routes/consumer/general.php'));
    }
}
