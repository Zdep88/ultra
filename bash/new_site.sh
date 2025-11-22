#!/bin/sh

if [ $# -eq 3 ]; then
    giturl="$1"
    domain="$2"
    port="$3"
else
    echo
    read -p "Git ssh url : " giturl
    read -p "New domain : " domain
    echo
    echo "Ports already used :" 
    grep -h "proxy_pass.*localhost:" /etc/nginx/sites-enabled/* 2>/dev/null | grep -o "localhost:[0-9]\+" | cut -d: -f2 | sort -n | uniq
    echo
    read -p "Application port : " port
fi
gitname=$(basename $giturl .git)
sudo cp $HOME/ultra/templates/server_bloc.txt /etc/nginx/sites-available/$domain
sudo sed -i "s/DOMAIN/${domain}/g" /etc/nginx/sites-available/$domain
sudo sed -i "s/PORT/${port}/g" /etc/nginx/sites-available/$domain
sudo ln -s /etc/nginx/sites-available/$domain /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
sudo sed -i "/apps : \[/r $HOME/ultra/templates/ecobloc.txt" $HOME/ecosystem.config.js
sudo sed -i "s/name : \"\",/name : \"${gitname}\",/g" $HOME/ecosystem.config.js
sudo sed -i "s/cwd : \"\",/cwd : \"${gitname}\",/g" $HOME/ecosystem.config.js
cd $HOME && git clone $giturl
cd $HOME/$gitname && tmux &&
cd $HOME && pm2 delete all
cd $HOME && pm2 start ecosystem.config.js
pm2 save
cd $HOME/ultra && echo && npm run