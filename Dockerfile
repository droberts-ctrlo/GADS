FROM node:24-alpine AS builder
WORKDIR /app
COPY . /app/
RUN ["cp", "./public/js/fengari-web.js", "./"]
RUN ["yarn", "--frozen-lockfile --no-progress"]
RUN ["sh", "-c", "NODE_ENV=production yarn webpack"]
RUN ["cp", "./fengari-web.js", "./public/js/"]
RUN ["rm", "-rf", "./node_modules"]

FROM debian:trixie-slim
ENV DEBIAN_FRONTEND=noninteractive
ENV GADS_HOSTNAME=localhost
ENV GADS_USERNAME=test@example.com
ENV GADS_PASSWORD=xyz123
ENV PSQL_USER=postgres
ENV PSQL_PASSWORD=postgres
ENV PSQL_DATABASE=postgres
ENV PSQL_HOSTNAME=localhost
WORKDIR /app
COPY --from=builder /app /app
RUN ["apt-get", "update", "-qq"]
RUN ["apt-get", "install", "-yqq", "curl", "gpg"]
RUN ["sh", "-c", "curl -o- https://debian.ctrlo.com/repos/apt/debian/whatever.gpg.key | gpg --dearmor -o /usr/share/keyrings/ctrlo-keyring.gpg"]
RUN ["sh", "-c", "echo 'deb [signed-by=/usr/share/keyrings/ctrlo-keyring.gpg] https://debian.ctrlo.com/repos/apt/debian/ trixie main' > /etc/apt/sources.list.d/ctrlo.list"]
RUN ["apt-get", "update", "-qq"]
RUN ["apt-get", "install", "-yqq", "libctrlo-crypt-xkcdpassword-perl", "libdatetime-perl", "libdancer2-plugin-logreport-perl", "libmoox-types-mooselike-perl", "libhtml-fromtext-perl", "libdatetime-format-cldr-perl", "libpath-class-perl", "libmoox-singleton-perl", "libalgorithm-dependency-perl", "libstring-camelcase-perl", "libdata-compare-perl", "libdbix-class-perl", "libctrlo-pdf-perl", "libsession-token-perl", "libhtml-scrubber-perl", "libtext-markdown-perl", "libmail-message-perl", "liblingua-en-inflect-perl", "libmail-transport-perl", "libdatetime-format-iso8601-perl", "libdbix-class-helpers-perl", "libfile-bom-perl", "libtext-csv-perl", "libmoox-types-mooselike-datetime-perl", "liblist-compare-perl", "libmath-round-perl", "libtext-csv-encoded-perl", "libcgi-deurl-xs-perl", "libtree-dagnode-perl", "libdatetime-format-datemanip-perl", "libdate-holidays-gb-perl", "libinline-lua-perl", "libfile-libmagic-perl", "libnet-saml2-perl", "liburl-encode-perl", "libmath-random-isaac-xs-perl", "libtie-cache-perl", "libwww-mechanize-chrome-perl", "libdancer2-plugin-dbic-perl", "libdancer2-plugin-auth-extensible-perl", "libdancer2-plugin-auth-extensible-provider-dbic-perl", "libnet-oauth2-authorizationserver-perl", "libdbd-pg-perl"]
RUN ["apt-get", "clean", "-qq"]
RUN ["rm", "-rf", "/var/lib/apt/lists/*"]
RUN ["chmod", "+x", "./bin/docker.sh"]
EXPOSE 3000
ENTRYPOINT ["./bin/docker.sh"]
