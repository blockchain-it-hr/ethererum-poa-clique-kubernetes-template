let HDWalletProvider = require('truffle-hdwallet-provider');
const path = require('path');
const dotenv = require('dotenv');

let options = {};
if(process.env.ENV === 'development'){
    options.path = path.resolve(process.cwd(), '../.env.dev');
    console.log(options.path);
} else if(process.env.ENV === 'staging'){
    options.path = path.resolve(process.cwd(), '../.env.stag');
    console.log(options.path);
} else {
    options.path = path.resolve(process.cwd(), '../.env.prod');
    console.log(options.path);
}

dotenv.config(options);

let rpcEndpoint = process.env.RPC_ENDPOINT;
console.log(rpcEndpoint);
let privateKey = process.env.PRIVATE_KEY;

module.exports = {
  networks: {
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*" 
    },
    development: {
      provider: new HDWalletProvider(privateKey, rpcEndpoint),
      network_id: process.network_id,
      gasPrice: 0
    },
    staging: {
      provider: new HDWalletProvider(privateKey, rpcEndpoint),
      network_id: process.network_id,
      gasPrice: 0
    },
    production: {
      provider: new HDWalletProvider(privateKey, rpcEndpoint),
      network_id: process.network_id,
      gasPrice: 0
    }
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.5.2"
    }
  }
}
