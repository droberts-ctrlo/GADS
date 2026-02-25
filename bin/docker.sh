#!/bin/bash

set -eu

if [ ! -f "/app/.initialized" ]; then
    echo "Initializing database..."

    echo "CREATE USER ${LS_DB_USER} WITH PASSWORD '${LS_DB_PASSWORD}';" | PGPASSWORD=${PSQL_PASSWORD} psql -U ${PSQL_USER} -h ${PSQL_HOSTNAME}
    echo "CREATE DATABASE ${LS_DB} OWNER ${LS_DB_USER};" | PGPASSWORD=${PSQL_PASSWORD} psql -U ${PSQL_USER} -h ${PSQL_HOSTNAME}
    echo "CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;" | PGPASSWORD=${PSQL_PASSWORD} psql -U ${PSQL_USER} -h ${PSQL_HOSTNAME} ${LS_DB}

    perl ./bin/seed-database.pl \
        --initial_username "${LS_USER}" \
        --instance_name ${LS_INSTANCE} \
        --site "${LS_HOSTNAME}"

    echo "Database initialized."
    
    touch /app/.initialized
fi

perl ./bin/app.pl
