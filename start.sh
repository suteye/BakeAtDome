#!/bin/sh

#update packages
sudo yum update -y

#configure mongoDB
touch mongodb-org-6.0.repo
echo "[mongodb-org-6.0]" >> mongodb-org-6.0.repo
echo "name=MongoDB Repository" >> mongodb-org-6.0.repo
echo "baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/6.0/x86_64/" >>$
echo "gpgcheck=1" >> mongodb-org-6.0.repo
echo "enabled=1" >> mongodb-org-6.0.repo
echo "gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc" >> mongodb-org-$
sudo mv mongodb-org-6.0.repo /etc/yum.repos.d/

#Install the MongoDB packages
sudo yum install -y mongodb-org

#Start MongoDB.
sudo systemctl start mongod
#Verify that MongoDB has started successfully.
sudo systemctl status mongod

#mongo port
mongo --port 27017

#use BakeAtDome database
use BakeAtDome

#insert data
db.employees.insertOne({employeeEmail: "sutima.phe@dome.tu.ac.th",
employeePassword:"$2a$10$kBgFBG.EjGfsDBBJhq4iPO4Megd0tbcNuxEYw16t3nrD96kARR4i$",
employeePosition: "Admin",
employeeName: "Sutima",
employeePhone: "0634659559"
});

#install git
sudo yum install git -y

#install node.js
sudo yum install gcc-c++ make -y
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install nodejs -y

#install pm2
npm install -g pm2

#install web
git clone https://github.com/suteye/BakeAtDome.git
cd BakeAtDome
cd frontend
npm install

#start frontend with pm2
pm2 start 'npm start' -n 'frontend'

#go to backend
cd ../backend

#install backend
npm install --force

#start backend with pm2
pm2 start 'npm run server' -n 'backend'