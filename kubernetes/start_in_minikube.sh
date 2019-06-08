#!/usr/bin/env bash

echo "Do you want to start minikube? Y/n"
read -p "Y/n: " input
if [ "$input" = "Y" ]; then
    echo "Starting minikube"
    minikube start --cpus 4 --memory 4096
    #eval $(minikube docker-env)
fi
./blockchainit
kubectl apply -f yaml/
