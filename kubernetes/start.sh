#!/usr/bin/env bash

./blockchainit
kubectl apply -f yaml/00_claims.yaml && \\
sleep 120 && \\
kubectl apply -f yaml/
