#!/bin/sh

#update packages
sudo yum update -y

#configure mongoDB
sudo touch /etc/yum.repos.d/mongodb-org-6.0.repo
echo "[mongodb-org-6.0]" >> mongodb-org-6.0.repo
echo "name=MongoDB Repository" >> mongodb-org-6.0.repo
echo "baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/6.0/x86_64/" >> mongodb-org-6.0.repo
echo "gpgcheck=1" >> mongodb-org-6.0.repo
echo "enabled=1" >> mongodb-org-6.0.repo
echo "gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc" >> mongodb-org-6.0.repo

#Install the MongoDB packages
sudo yum install -y mongodb-org

#Start MongoDB.
sudo systemctl start mongod
#Verify that MongoDB has started successfully.
sudo systemctl status mongod

#install git
sudo yum install git -y

#install node.js
sudo yum install gcc-c++ make -y
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install nodejs -y

#update npm
sudo npm install -g npm@9.1.2

#install pm2
sudo npm install -g pm2

#install web
git clone https://github.com/suteye/BakeAtDome.git
cd BakeAtDome

#go to frontend
cd frontend
npm install

#start frontend with pm2
pm2 start 'npm start' -n 'frontend'

#go to backend
cd ../backend

#install backend
npm install --legacy-peer-deps

#start backend with pm2
pm2 start 'npm run server' -n 'backend'