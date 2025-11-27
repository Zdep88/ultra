#!/bin/sh

pm2 save
cd $HOME/ultra && clear && pm2 ls && npm run