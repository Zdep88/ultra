#!/bin/sh

if [ $# -eq 1 ]; then
    giturl="$1"
else
    echo
    read -p "Git ssh url : " giturl
fi
gitname=$(basename $giturl .git)

cd $HOME/$gitname/ && git pull && npm i
cd $HOME && pm2 restart $gitname