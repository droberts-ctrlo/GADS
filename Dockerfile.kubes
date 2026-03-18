FROM debian:12-slim

RUN ["mkdir","/app"]
COPY ./ /app
WORKDIR /app

ENV DEBIAN_FRONTEND="noninteractive"
ENV TZ="Europe/London"
ENV PSQL_HOSTNAME="postgres"
ENV PSQL_USER="postgres"
ENV PSQL_PASSWORD="postgrespassword"
ENV LS_DB="linkspace"
ENV LS_DB_USER="linkspace"
ENV LS_DB_PASSWORD="linkspace"
ENV LS_HOSTNAME="localhost"
ENV LS_INSTANCE="linkspace"
ENV LS_USER="test@example.com"
ENV PORT="3000"

RUN apt-get update && \
    apt-get install -y curl gpg && \
    curl -o- https://debian.ctrlo.com/repos/apt/debian/whatever.gpg.key | gpg --dearmor -o /usr/share/keyrings/ctrlo-keyring.gpg && \
    echo 'deb [signed-by=/usr/share/keyrings/ctrlo-keyring.gpg] https://debian.ctrlo.com/repos/apt/debian/ bookworm main' | tee /etc/apt/sources.list.d/ctrlo.list && \
    apt-get update && \
    apt-get install -y libconfig-inifiles-perl libcrypt-saltedhash-perl libcrypt-urandom-perl libdancer2-perl \
                       libdancer2-plugin-auth-extensible-provider-dbic-perl libdancer2-plugin-dbic-perl libdancer2-session-dbic-perl \
                       libdata-dump-streamer-perl libdata-visitor-perl libdatetime-format-mysql-perl libdbd-mysql-perl \
                       libdbix-class-migration-perl libdbix-class-perl libfcgi-perl libfile-copy-recursive-perl \
                       libio-all-perl liblog-report-lexicon-perl liblog-report-perl libmail-box-perl libmail-transport-perl \
                       libmath-random-isaac-xs-perl libmoox-singleton-perl libpod-parser-perl libregexp-common-perl \
                       libstring-camelcase-perl libtemplate-perl libtext-autoformat-perl libtext-csv-perl libyaml-libyaml-perl \
                       libdatetime-format-cldr-perl libtree-dagnode-perl libalgorithm-dependency-perl libdatetime-set-perl \
                       libdata-compare-perl libdatetime-event-random-perl libtext-csv-encoded-perl libhtml-fromtext-perl \
                       libhtml-scrubber-perl libdbd-pg-perl postgresql-client libdatetime-format-pg-perl libset-infinite-perl \
                       libtie-cache-perl libdbix-class-helpers-perl libmath-round-perl libmoox-types-mooselike-datetime-perl \ 
                       libdatetime-format-datemanip-perl libinline-lua-perl lua5.2 libctrlo-crypt-xkcdpassword-perl \
                       libfile-slurp-perl libfile-mimeinfo-perl liblist-compare-perl libnet-oauth2-authorizationserver-perl \
                       libfontconfig1 libctrlo-pdf-perl libpdf-builder-perl fonts-liberation libdate-holidays-gb-perl \
                       libcgi-deurl-xs-perl libfile-bom-perl libdatetime-format-iso8601-perl liblog-log4perl-perl \
                       libwww-mechanize-chrome-perl chromium libfile-libmagic-perl libnet-saml2-perl liburl-encode-perl \
                       libtext-markdown-perl libtest-tempdir-tiny-perl libtest-mocktime-perl && \
    apt-get clean && rm -rf /var/lib/apt/lists/* && \
    chmod +x /app/bin/cleanup.sh && ./bin/cleanup.sh

ENTRYPOINT [ "./bin/app.pl" ]
