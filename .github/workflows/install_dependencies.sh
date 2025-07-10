#!/bin/bash

if [[ $UID -ne 0 ]]; then
  echo "This script must be run as root or with sudo."
  exit 1
fi

apt-get update;
apt-get install -y curl gpg
curl -o- https://debian.ctrlo.com/repos/apt/debian/whatever.gpg.key | gpg --dearmor -o /usr/share/keyrings/ctrlo-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/ctrlo-keyring.gpg] http://debian.ctrlo.com/repos/apt/debian bookworm main" | tee /etc/apt/sources.list.d/ctrlo.list
apt-get update

apt-get install -y cpanminus liblua5.3-dev libdancer2-perl libdatetime-format-sqlite-perl libtest-most-perl libdatetime-set-perl \
  libdbix-class-schema-loader-perl libtest-tempdir-tiny-perl libcgi-deurl-xs-perl libcrypt-urandom-perl libctrlo-crypt-xkcdpassword-perl \
  libctrlo-pdf-perl libdbd-pg-perl libdbix-class-migration-perl libdancer2-perl libdancer2-plugin-auth-extensible-perl \
  libdancer2-plugin-auth-extensible-provider-dbic-perl libdancer2-plugin-dbic-perl libdata-compare-perl libdate-holidays-gb-perl \
  libdatetime-perl libdatetime-event-random-perl libdatetime-format-cldr-perl libdatetime-format-datemanip-perl \
  libdatetime-format-iso8601-perl libdatetime-format-sqlite-perl libdatetime-format-strptime-perl libfile-bom-perl libfile-libmagic-perl \
  libhtml-fromtext-perl libhtml-scrubber-perl libinline-lua-perl liblist-compare-perl liblist-moreutils-perl liblog-log4perl-perl \
  liblog-report-perl libmail-message-perl libmath-random-isaac-xs-perl libmath-round-perl libmoox-singleton-perl \
  libmoox-types-mooselike-datetime-perl libnet-saml2-perl libpdf-table-perl libplack-perl libsession-token-perl libstring-camelcase-perl \
  libtest-mocktime-perl libtext-autoformat-perl libtext-csv-encoded-perl libtext-markdown-perl libtie-cache-perl liburl-encode-perl \
  libwww-form-urlencoded-xs-perl libwww-mechanize-chrome-perl libyaml-perl libnamespace-clean-perl libmoo-perl libdatetime-format-sqlite-perl \
  libtest-most-perl libdatetime-set-perl libdbix-class-schema-loader-perl libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 \
  libxtst6 xauth xvfb libalgorithm-dependency-perl libdbix-class-helpers-perl libdbix-class-perl liblog-report-perl libdatetime-set-perl \
  libmail-transport-perl libnet-oauth2-authorizationserver-perl libtest-simple-perl sudo
