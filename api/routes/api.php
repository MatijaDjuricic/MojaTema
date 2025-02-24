<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::get('/me', 'me')->middleware(['auth:sanctum']);
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware(['auth:sanctum']);
    Route::patch('/password', 'changePassword')->middleware(['auth:sanctum']);
});

Route::middleware('auth:sanctum')->group(function() {
    Route::prefix('users')->controller(UserController::class)->group(function() {
        Route::get('/chat', 'chatAvailableUsers');
        Route::get('/', 'usersAll');
        Route::get('/{id}', 'userById');
    });
    Route::prefix('subjects')->controller(SubjectController::class)->group(function () {
        Route::get('/', 'subjectsAll');
        Route::get('/{id}', 'subjectById');
        Route::get('/professor/{id}', 'subjectsByProfessor');
    });
    Route::prefix('topics')->controller(TopicController::class)->group(function () {
        Route::get('/', 'topicsAll');
        Route::get('/{id}', 'topicById');
        Route::post('/', 'createTopic');
        Route::post('/import', 'importTopics');
        Route::get('/professor/{id}', 'topicsByProfessor');
        Route::put('/{id}', 'updateTopic');
        Route::patch('/{id}/status', 'updateTopicStatus');
        Route::delete('/{id}', 'deleteTopic');
    });
});