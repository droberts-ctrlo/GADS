FROM debian:bookworm
RUN ["mkdir", "/app"]
COPY ./ /app
WORKDIR /app
ENV DEBIAN_FRONTEND=noninteractive
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "curl", "gpg"]
RUN curl -o- https://debian.ctrlo.com/repos/apt/debian/whatever.gpg.key | gpg --dearmor -o /usr/share/keyrings/ctrlo-keyring.gpg
RUN echo 'deb [signed-by=/usr/share/keyrings/ctrlo-keyring.gpg] https://debian.ctrlo.com/repos/apt/debian/ bookworm main' | tee /etc/apt/sources.list.d/ctrlo.list
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "g++", "gcc", "libalgorithm-dependency-perl", "libcgi-deurl-xs-perl", "libcrypt-urandom-perl"]
RUN ["apt-get", "install", "-y", "libctrlo-crypt-xkcdpassword-perl", "libctrlo-pdf-perl", "libdancer-plugin-auth-extensible-perl"]
RUN ["apt-get", "install", "-y", "libdancer2-perl", "libdancer2-plugin-auth-extensible-perl", "libdancer2-plugin-auth-extensible-provider-dbic-perl"]
RUN ["apt-get", "install", "-y", "libdancer2-plugin-dbic-perl", "libdata-compare-perl", "libdate-holidays-gb-perl", "libdatetime-event-random-perl"]
RUN ["apt-get", "install", "-y", "libdatetime-format-cldr-perl", "libdatetime-format-datemanip-perl", "libdatetime-format-dateparse-perl"]
RUN ["apt-get", "install", "-y", "libdatetime-format-iso8601-perl", "libdatetime-format-sqlite-perl", "libdatetime-format-strptime-perl"]
RUN ["apt-get", "install", "-y", "libdatetime-perl", "libdatetime-set-perl", "libdbd-pg-perl", "libdbix-class-helpers-perl"]
RUN ["apt-get", "install", "-y", "libdbix-class-migration-perl", "libdbix-class-perl", "libdbix-class-schema-loader-perl", "libfile-bom-perl"]
RUN ["apt-get", "install", "-y", "libfile-libmagic-perl", "libhtml-fromtext-perl", "libhtml-scrubber-perl", "libinline-lua-perl", "libjson-perl"]
RUN ["apt-get", "install", "-y", "liblist-compare-perl", "liblist-moreutils-perl", "liblog-log4perl-perl", "liblog-report-perl", "liblua5.3-dev"]
RUN ["apt-get", "install", "-y", "libmagic-dev", "libmail-message-perl", "libmail-transport-perl", "libmath-random-isaac-xs-perl", "libmath-round-perl"]
RUN ["apt-get", "install", "-y", "libmoox-singleton-perl", "libmoox-types-mooselike-datetime-perl", "libmoox-types-mooselike-perl"]
RUN ["apt-get", "install", "-y", "libnamespace-clean-perl", "libnet-oauth2-authorizationserver-perl", "libnet-saml2-perl", "libpdf-table-perl"]
RUN ["apt-get", "install", "-y", "libplack-perl", "libpng-dev", "libpq-dev", "libscalar-list-utils-perl", "libsession-token-perl", "libssl-dev"]
RUN ["apt-get", "install", "-y", "libstring-camelcase-perl", "libtest-mocktime-perl", "libtest-most-perl", "libtext-autoformat-perl"]
RUN ["apt-get", "install", "-y", "libtext-csv-encoded-perl", "libtext-markdown-perl", "libtie-cache-perl", "libtree-dagnode-perl", "liburl-encode-perl"]
RUN ["apt-get", "install", "-y", "libwww-form-urlencoded-xs-perl", "libwww-mechanize-chrome-perl", "libwww-mechanize-perl", "libyaml-perl", "postfix"]
RUN ["apt-get", "install", "-y", "postgresql-client", "starman", "perl"]
RUN ["cp", "./config.yml-example", "./config.yml"]
RUN ["sed", "-i", "s/is_secure: 1/# is_secure: 1/", "./config.yml"]
RUN ["sed", "-i", "s/dsn: dbi:Pg:database=gads;host=127.0.0.1/dsn: dbi:Pg:database=gads;host=db/", "./config.yml"]
RUN ["sed", "-i", "s/user: dbuser/user: gads/", "./config.yml"]
RUN ["sed", "-i", "s/password: dbpass/password: mysecret/", "./config.yml"]
EXPOSE 3000
ENTRYPOINT [ "./bin/docker.sh" ]
