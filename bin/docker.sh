#!/bin/bash

: ${GADS_HOSTNAME:=localhost}
: ${PSQL_USER:=linkspace}
: ${PSQL_PASSWORD:=linkspace}
: ${PSQL_DATABASE:=linkspace}
: ${PSQL_HOSTNAME:=localhost}
: ${GADS_USERNAME:=test@example.com}
: ${GADS_PASSWORD:=xyz123}

if [ ! -f ./config.yml ]; then
    cat ./config.yml-example | sed -e "s/dbi:Pg:database=gads;host=127.0.0.1/dbi:Pg:database=${PSQL_DATABASE};host=${PSQL_HOSTNAME}/i" -e "s/user: dbuser/user: ${PSQL_USER}/i" -e "s/password: dbpass/password: ${PSQL_PASSWORD}/i" > config.yml
    echo "*:*:*:${PSQL_USER}:${PSQL_PASSWORD}" > ~/.pgpass
    chmod 600 ~/.pgpass
    echo "CREATE EXTENSION IF NOT EXISTS \"CITEXT\";" | psql -h ${PSQL_HOSTNAME} -U ${PSQL_USER} -d ${PSQL_DATABASE}
    ./bin/seed-database.pl --initial_username=${GADS_USERNAME} --instance_name="default" --site=${GADS_HOSTNAME}
    perl -Ilib -MDancer2 -MDancer2::Plugin::Auth::Extensible -wE  "user_password username => '${GADS_USERNAME}', new_password => '${GADS_PASSWORD}'"
fi

./bin/app.pl
