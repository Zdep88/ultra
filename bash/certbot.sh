#!/bin/sh

sudo certbot --nginx
cd $HOME/ultra && echo && npm run