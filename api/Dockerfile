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

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN if ! getent passwd www-data; then \
    groupadd -g 82 www-data && useradd -u 82 -g www-data -m -d /var/www www-data; \
    fi

WORKDIR /var/www

COPY . /var/www

RUN chown -R www-data:www-data /var/www
RUN mkdir -p /var/www/storage /var/www/bootstrap/cache && \
    chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

RUN composer install --no-dev --optimize-autoloader

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 9000

CMD ["sh", "-c", "nginx -g 'daemon off;' & php-fpm"]