#!/bin/bash

npm i
cp .env.example .env
sudo nano .env
set -a
source ./.env
set +a
sudo -i -u postgres psql -c "CREATE ROLE \"$DATABASE_USER\" WITH LOGIN PASSWORD '$DATABASE_PASSWORD'"
sudo -i -u postgres psql -c "CREATE DATABASE \"$DATABASE_NAME\" OWNER \"$DATABASE_USER\""
sudo cp $HOME/ultra/templates/server_bloc.txt /etc/nginx/sites-available/$DOMAIN
sudo sed -i "s/DOMAIN/$DOMAIN/g" /etc/nginx/sites-available/$DOMAIN
sudo sed -i "s/PORT/$PORT/g" /etc/nginx/sites-available/$DOMAIN
sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
sudo sed -i "/apps : \[/r $HOME/ultra/templates/ecobloc.txt" $HOME/ecosystem.config.js
sudo sed -i "s/name : \"\",/name : \"ultra\",/g" $HOME/ecosystem.config.js
sudo sed -i "s/cwd : \"\",/cwd : \"ultra\",/g" $HOME/ecosystem.config.js