FROM php:8.2-fpm-alpine

RUN apk update && apk add \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    shadow \
    bash \
    git \
    libjpeg-turbo-dev \
    libfreetype6-dev

RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www

RUN composer create-project --prefer-dist laravel/laravel my-laravel-app

WORKDIR /var/www/my-laravel-app

EXPOSE 9000

CMD php artisan serve --host=0.0.0.0 --port=9000