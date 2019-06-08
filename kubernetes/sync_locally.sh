#!/usr/bin/env bash
geth removedb
geth init genesis.json
geth --networkid 123412345 --syncmode "full" --bootnodes  "enode://288b97262895b1c7ec61cf314c2e2004407d0a5dc77566877aad1f2a36659c8b698f4b56fd06c4a0c0bf007b4cfb3e7122d907da3b005fa90e724441902eb19e@127.0.0.1:30303" --rpc
