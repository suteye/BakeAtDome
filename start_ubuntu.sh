#!/bin/sh

#update packages
apt-get update -y

#configure mongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt-get update -y
apt-get install -y mongodb-org
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-mongosh hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
apt-get update -y

systemctl start mongod


# touch mongodb-org-6.0.repo
# echo "[mongodb-org-6.0]" >> mongodb-org-6.0.repo
# echo "name=MongoDB Repository" >> mongodb-org-6.0.repo
# echo "baseurl=https://repo.mongodb.org/apt-get/amazon/2/mongodb-org/6.0/x86_64/" >> mongodb-org-6.0.repo
# echo "gpgcheck=1" >> mongodb-org-6.0.repo
# echo "enabled=1" >> mongodb-org-6.0.repo
# echo "gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc" >> mongodb-org-6.0.repo
# mv mongodb-org-6.0.repo /etc/apt-get.repos.d/

# #Install the MongoDB packages
# apt-get install -y mongodb-org

# #Start MongoDB.
# systemctl start mongod
# #Verify that MongoDB has started successfully.
# systemctl status mongod

#mongo port
mongod --port 27017

#use BakeAtDome database
use BakeAtDome

#install git
apt-get install git -y

#install node.js
apt-get install nodejs -y

#install pm2
npm install -g pm2

#install web
git clone https://github.com/suteye/BakeAtDome.git
cd BakeAtDome

#go to frontend
cd frontend
npm i -f

#start frontend with pm2
pm2 start 'npm start' -n 'frontend'

#go to backend
cd ../backend

#install backend
npm i -f

#start backend with pm2
pm2 start 'npm run server' -n 'backend'