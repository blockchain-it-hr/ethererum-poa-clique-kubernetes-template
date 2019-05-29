#!/usr/bin/env bash

kubectl delete -f deployment.yaml && \\
sleep 20 && \\
kubectl delete -f claims.yaml && \\
sleep 20 && \\
kubectl apply -f claims.yaml && \\
sleep 20 && \\
kubectl apply -f deployment.yaml
