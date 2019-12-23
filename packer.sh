#!/bin/bash

echo "Packing into ZIP"

source .env

mkdir nbnet.pkg
cp -r ./dist nbnet.pkg
cp ./package.json nbnet.pkg 
cp ./runner.sh nbnet.pkg
cp ./server.js nbnet.pkg
cp ./get.assets.prod.js nbnet.pkg

zip -r nbnet.pkg.zip nbnet.pkg
rm -r nbnet.pkg

echo "ZIP pack completed"

echo "Send to EC2?"
read ans

if [[ $ans == *"y"* ]];
then
    echo "Pushing to EC2"
    scp ./nbnet.pkg.zip nathanbarber@$EC2_IP:~/
    rm nbnet.pkg.zip

    echo "Sign in to EC2?"
    read ans2
    if [[ $ans2 == *"y"* ]];
    then
        echo "Connecting..."
        ssh nathanbarber@$EC2_IP
    else
        echo "Skipping EC2 administration"
    fi
else
    echo "Skipping EC2 load"
fi

echo "DONE"