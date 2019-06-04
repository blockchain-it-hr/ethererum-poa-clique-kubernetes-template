#!/usr/bin/env bash

echo "Do you want to start minikube? Y/n"
read -p input
if [ "$input" = "Y" ]; then
    echo "Starting minikube"
    minikube start
    eval $(minikube docker-env)
fi
./kuberneteth
kubectl apply -f deployment.yaml