#!/usr/bin/env bash

echo "Do you want to start minikube? Y/n"
read -p "Y/n: " input
if [ "$input" = "Y" ]; then
    echo "Starting minikube"
    minikube start --cpus 4 --memory 4096
    #eval $(minikube docker-env)
fi
./kuberneteth
kubectl apply -f claims.yaml
sleep 60
kubectl apply -f deployment.yaml