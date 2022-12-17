<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait HasError
{
    protected string $error;
    protected int $code;

    public function setError(string $error, $code): void
    {
        $this->error = $error;
        $this->code = intval($code);
    }

    public function getError(): Response
    {
        return response()->fail($this->error, (int)$this->code);
    }
}
