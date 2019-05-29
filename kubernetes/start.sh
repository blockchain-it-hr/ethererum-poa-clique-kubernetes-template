#!/usr/bin/env bash

./kuberneteth

kubectl apply -f claims.yaml && \\
sleep 20 && \\
kubectl apply -f deployment.yaml
