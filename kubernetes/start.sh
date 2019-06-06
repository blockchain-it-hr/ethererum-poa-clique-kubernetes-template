#!/usr/bin/env bash

./kuberneteth

kubectl apply -f claims.yaml && \\
sleep 20 && \\
kubectl apply -f deployment.yaml

/bootnode --nodekeyhex 091bd6067cb4612df85d9c1ff85cc47f259ced4d4cd99816b14f35650f59c322 --addr \":30303\" --nat any --verbosity 9;
