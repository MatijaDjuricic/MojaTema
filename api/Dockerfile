FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    git \
    unzip \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

RUN if ! getent passwd www-data; then \
    groupadd -g 82 www-data && useradd -u 82 -g www-data -m -d /var/www www-data; \
    fi
    WORKDIR /var/www


COPY . /var/www

RUN chown -R www-data:www-data /var/www

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 9000

CMD service nginx start && php-fpm
