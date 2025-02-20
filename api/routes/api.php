<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::group(['prefix' => 'auth'], function () {
    Route::get('/me', [AuthController::class, 'me'])->middleware(['auth:sanctum']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum']);
});

Route::group(['prefix' => 'users', 'middleware' => ['auth:sanctum']], function () {
    Route::get('/chat', [UserController::class, 'chatAvailableUsers']);
    Route::get('/', [UserController::class, 'usersAll']);
    Route::get('/{id}', [UserController::class, 'userById']);
});

Route::group(['prefix' => 'subjects', 'middleware' => ['auth:sanctum']], function () {
    Route::get('/', [SubjectController::class, 'subjectsAll']);
    Route::get('/{id}', [SubjectController::class, 'subjectById']);
    Route::get('/professor/{id}', [SubjectController::class, 'subjectsByProfessor']);
});

Route::group(['prefix' => 'topics', 'middleware' => ['auth:sanctum']], function () {
    Route::get('/', [TopicController::class, 'topicsAll']);
    Route::get('/{id}', [TopicController::class, 'topicById']);
    Route::post('/', [TopicController::class, 'createTopic']);
    Route::post('/import', [TopicController::class, 'importTopics']);
    Route::get('/professor/{id}', [TopicController::class, 'topicsByProfessor']);
    Route::put('/{id}', [TopicController::class, 'updateTopic']);
    Route::put('/{id}/status', [TopicController::class, 'updateTopicStatus']);
    Route::delete('/{id}', [TopicController::class, 'deleteTopic']);
});