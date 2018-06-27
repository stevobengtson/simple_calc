#!/bin/bash

ng build --prod
pushd dist
tar zcvf dist.tar.gz dist/*
scp dist.tar.gz user:password@server:/tmp

ssh user:password@server << EOSSH
service nginx stop
cd /tmp
tar zxvf dist.tar.gz
export RELEASE_DATE=$(date +"%Y-%m-%d-%H-%M-%S")
mv dist /var/www/$RELEASE_DATE
ln -s /var/www/$RELEASE_DATE /var/www/html
service nginx start
EOSSH
