#!/usr/bin/env bash

#./kuberneteth

kubectl delete -f deployment.yaml && \\
sleep 30 && \
kubectl delete -f claims.yaml && \\
sleep 30 && \
kubectl apply -f claims.yaml && \\
sleep 30 && \
kubectl apply -f deployment.yaml
