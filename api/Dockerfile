FROM php:8.2-fpm-bullseye

USER root

RUN apt-get update && apt-get install -y \
            libxpm-dev \
            libfreetype6-dev \
            libwebp-dev \
            libjpeg-dev \
            libpng-dev \
            build-essential \
            libssl-dev \
            zlib1g-dev \
            libxml2-dev \
            libzip-dev \
            zip \
            curl \
            unzip \
            vim \
            supervisor
RUN pecl install -o -f xdebug \
&&  docker-php-ext-enable xdebug \
&&  rm -rf /tmp/pear \
&&  pecl install -o -f redis \
&&  docker-php-ext-enable redis 


RUN docker-php-ext-configure pcntl --enable-pcntl \
    && docker-php-ext-install sockets \
    && docker-php-ext-enable sockets \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pcntl \
    && docker-php-ext-install intl \
    && docker-php-ext-install exif \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install mysqli \
    && docker-php-ext-install zip \
    && docker-php-source delete

RUN docker-php-ext-configure gd \
            --enable-gd \
            --with-jpeg \
            --with-webp \
            --with-xpm \
            --with-freetype \
    # docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install gd
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Add a non-root user to prevent files being created with root permissions on host machine.
ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}

RUN groupadd -g ${PGID} apache && \
    useradd -l -u ${PUID} -g apache -m apache && \
    usermod -p "*" apache -s /bin/bash

###########################################################################
# Set Timezone
###########################################################################

ARG TZ=UTC+05:45
ENV TZ ${TZ}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


# COPY --chown=apache:apache . /var/www
WORKDIR /var/www

# RUN composer install

EXPOSE 9000