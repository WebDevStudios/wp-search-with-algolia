#!/bin/bash
# Inspiration https://github.com/spatie/wordpress-ray/blob/2a929d776ae94a3ef0a548fe7fb48c32309b0688/build.sh

echo "# Remove vendor dir..."

rm -r -f vendor
rm composer.lock

echo "# Composer install..."

composer update --prefer-lowest --with-all-dependencies

composer bin php-scoper require --dev humbug/php-scoper

echo "# Executing PHP Scoper..."

vendor/bin/php-scoper add-prefix --force

echo "# Preparing build dir..."

cd build

composer update nothing --no-dev

composer dump-autoload

mv vendor-bin/php-scoper/vendor/scoper-autoload.php vendor/

rm -r src

rm -r vendor-bin

rm -r composer.json

rm -r composer.lock

cd ../

echo "# Replacing vendor with build..."

rm -r -f vendor

mv build/vendor vendor

rm -r -f build

echo "# Generating custom autoloader..."

php <<\EOF
<?php
$autoload = str_replace(['<?php', 'return'], ['', '$loader = '],file_get_contents('vendor/autoload.php'));
$scoperAutoload = file_get_contents('vendor/scoper-autoload.php');
$scoperAutoload = str_replace('$loader = require_once __DIR__.\'/autoload.php\';', $autoload, $scoperAutoload);
file_put_contents('vendor/autoload.php',$scoperAutoload);
EOF

rm vendor/scoper-autoload.php

cat << "EOF"
    ____                 
   / __ \____  ____  ___ 
  / / / / __ \/ __ \/ _ \
 / /_/ / /_/ / / / /  __/
/_____/\____/_/ /_/\___/ 
EOF