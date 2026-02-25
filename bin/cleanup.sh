#!/bin/bash

for i in babel.config.js test.csv .eslintignore changelist.md .eslintrc.js UPGRADE compose-dev.yml .git MIGRATIONS config.yml-example .gitattributes node_modules VERSION contrib .github package.json create_user.csv .gitignore .vscode cypress handlebars README.md webdriver cypress.config.ts _Inline rex webpack.config.js docker-compose.yml jest.config.js yarn.lock Dockerfile .jshintrc sql Dockerfile.dev src; do
    if [ -f "$i" ] || [ -d "$i" ]; then
        echo "Removing $i"
        rm -rfv "$i"
    fi
done
