# Ultra

## Create sudo user

```sh
clear
read -p "Enter username: " username
sudo adduser "$username"
sudo usermod -aG sudo "$username"
```

## SSH Keys

https://github.com/settings/keys

## Full Installation Script

```sh
# Information gathering
clear
read -p "Enter full name : " name # required for Git
read -p "Enter email : " email # required for SSH & Git
read -p "Enter psql password : " -s password # required for postgres

# SSH Key creation
ssh-keygen -t ed25519 -C $email -f $HOME/.ssh/id_ed25519 -N ""
eval "$(ssh-agent -s)"
ssh-add $HOME/.ssh/id_ed25519
clear
cat $HOME/.ssh/id_ed25519.pub
read -p "Copy SSH key, then press any key to continue." -n 1 -s
echo

# global upgrade
sudo apt update && sudo apt upgrade -y

# Git installation & configuration
sudo apt install -y git
git config --global user.name "$name"
git config --global user.email $email
git config --global init.defaultBranch main

# nvm, npm, node & vite installation
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install --lts
nvm use --lts
npm i npm@latest -g
npm i vite -g

# nginx installation & configuration
sudo apt install -y nginx
sudo sed -i 's/^[[:space:]]*#[[:space:]]*server_names_hash_bucket_size/        server_names_hash_bucket_size/' /etc/nginx/nginx.conf
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# postgres installation & configuration
sudo apt install -y postgresql
sudo sed -i '/^[^#].*peer/s/peer/trust/' /etc/postgresql/16/main/pg_hba.conf
sudo systemctl restart postgresql
sudo -i -u postgres psql -c "ALTER USER postgres PASSWORD '$password'"
sudo sed -i '/^[^#].*trust/s/trust/md5/' /etc/postgresql/16/main/pg_hba.conf
sudo systemctl restart postgresql

# certbot installation
sudo apt install -y snapd
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# pm2 installation & configuration
npm install pm2@latest -g
pm2 update
pm2 startup
sudo env "PATH=$PATH:$HOME/.nvm/versions/node/$(node -v)/bin" $HOME/.nvm/versions/node/$(node -v)/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME

# Next installation step
cd $HOME && git clone git@github.com:Zdep88/ultra.git
```