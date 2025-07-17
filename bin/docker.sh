#!/bin/bash

if [[ !-f initialized ]]
then
    ./bin/seed-database.pl --initial_username test@example.com --instance_name WebDriverTestSheet --site localhost
    perl -Ilib -MDancer2 -MDancer2::Plugin::Auth::Extensible -wE "user_password username => 'test@example.com', new_password => 'xyz123'"
    touch initialized
fi

./bin/app.pl
