<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::middleware('web')->prefix('api')->get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::middleware('web')->prefix('api/auth')->controller(AuthController::class)->group(function () {
    
    Route::get('/me', 'me')->middleware(['auth:sanctum']);
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware(['auth:sanctum']);
    Route::patch('/password', 'changePassword')->middleware(['auth:sanctum']);
});