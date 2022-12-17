<?php

namespace App\Http\Requests;

use App\Enums\UserType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class ServiceLoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8'],
            'type' => [new Enum(UserType::class)],
            'latitude' => ['required'],
            'longitude' => ['required']
        ];
    }
}
