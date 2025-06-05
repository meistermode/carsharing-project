# Use an official PHP image with Apache
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    git \
    curl \
    libzip-dev \
    zip \
    unzip \
    postgresql-dev \
    supervisor

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql zip

# Install Composer
COPY --from=composer/composer:latest-bin /composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY . .

# Create .env file from .env.example if it doesn't exist
RUN cp .env.example .env || true

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions for storage and bootstrap/cache
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx and PHP-FPM
CMD php-fpm && nginx -g "daemon off;"
