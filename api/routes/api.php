<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfessorSubjectController;
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
        Route::post('/', 'createUser');
        Route::post('/import', 'importUsers');
        Route::put('/{id}', 'updateUser');
        Route::delete('/{id}', 'deleteUser');
    });
    Route::prefix('subjects')->controller(SubjectController::class)->group(function () {
        Route::get('/', 'subjectsAll');
        Route::get('/{id}', 'subjectById');
        Route::get('/professor/{id}', 'subjectsByProfessor');
        Route::post('/', 'createSubject');
        Route::post('/import', 'importSubjects');
        Route::put('/{id}', 'updateSubject');
        Route::delete('/{id}', 'deleteSubject');
    });
    Route::prefix('professor-subjects')->controller(ProfessorSubjectController::class)->group(function () {
        Route::get('/', 'professorSubjectsAll');
        Route::get('/{id}', 'professorSubjectById');
        Route::get('/professor/{id}', 'professorSubjectsByProfessor');
        Route::post('/', 'createProfessorSubject');
        Route::post('/import', 'importProfessorSubjects');
        Route::put('/{id}', 'updateProfessorSubject');
        Route::delete('/{id}', 'deleteProfessorSubject');
    });
    Route::prefix('topics')->controller(TopicController::class)->group(function () {
        Route::get('/', 'topicsAll');
        Route::get('/reported', 'topicsReported');
        Route::get('/{id}', 'topicById');
        Route::post('/', 'createTopic');
        Route::post('/import', 'importTopics');
        Route::get('/professor/{id}', 'topicsByProfessor');
        Route::put('/{id}', 'updateTopic');
        Route::patch('/{id}/status', 'updateTopicStatus');
        Route::delete('/{id}', 'deleteTopic');
    });
});