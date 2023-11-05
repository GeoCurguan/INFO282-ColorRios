# Usa una imagen base de PHP con Apache
FROM php:8.1-apache

# Instala dependencias requeridas
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev

# Habilita extensiones PHP necesarias
RUN docker-php-ext-install zip pdo pdo_mysql

# Habilita mod_rewrite de Apache para Symfony
RUN a2enmod rewrite

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Copia los archivos del proyecto Symfony al contenedor
COPY . .

# Instala Composer (administrador de paquetes de PHP)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instala las dependencias del proyecto con Composer
RUN composer install

# Asegúrate de que los archivos y directorios importantes sean accesibles
RUN chown -R www-data:www-data var

# Expone el puerto 80 para acceder a la aplicación Symfony
EXPOSE 80

# Comando de inicio para el contenedor (inicia Apache)
CMD ["apache2-foreground"]
