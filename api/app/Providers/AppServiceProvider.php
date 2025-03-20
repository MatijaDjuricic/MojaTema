<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\IAuthService;
use App\Interfaces\IUserService;
use App\Interfaces\ISubjectService;
use App\Interfaces\ITopicService;
use App\Models\User;
use App\Observers\UserObserver;
use App\Services\AuthService;
use App\Services\UserService;
use App\Services\SubjectService;
use App\Services\TopicService;
class AppServiceProvider extends ServiceProvider {
    public function register() {
        $this->app->bind(IAuthService::class, AuthService::class);
        $this->app->bind(IUserService::class, UserService::class);
        $this->app->bind(ISubjectService::class, SubjectService::class);
        $this->app->bind(ITopicService::class, TopicService::class);
    }
    public function boot() {
        User::observe(UserObserver::class);
    }
}