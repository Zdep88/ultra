#!/bin/sh

cd $HOME && pm2 delete all
cd $HOME && pm2 start ecosystem.config.js
cd $HOME && pm2 save
cd $HOME/ultra && clear && pm2 ls && npm run