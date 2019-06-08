#!/usr/bin/env bash

./blockchainit
kubectl delete -f yaml/ && \\
sleep 30 && \
kubectl apply -f yaml/
