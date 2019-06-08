let Web3 = require('web3');
let HDWalletProvider = require('truffle-hdwallet-provider');
let rpcEndpoint = process.env.RPC_ENDPOINT;
let privateKey = process.env.PRIVATE_KEY;
let provider = new HDWalletProvider(privateKey, rpcEndpoint);
let networkId = process.env.NETWORK_ID;
const web3 = new Web3(provider, undefined, {
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
});
//const factoryData = require('../../../blockchain/build/contracts/Factory');
//const instanceData = require('../../../blockchain/build/contracts/Instance');
const AssetNotFound = require("../errors/errors").AssetNotFound;
const asyncForEach = require("../services/helpers").asyncForEach;

async function getAll(mnemonic, privatekey, walletaddress) {
    web3.defaultAccount = walletaddress;
    let Factory = new web3.eth.Contract(factoryData.abi, factoryData.networks[networkId].address);
    let result;
    await Factory.methods.getAllInstances().call({from: walletaddress}, (error, response) => {
        result = response;
    });

    if (result === null) {
        return [];
    }

    return result;
}

async function getAllInstancesData(mnemonic, privatekey, walletaddress) {
    let instancesList = [];
    let instancesData = [];
    web3.defaultAccount = walletaddress;
    let Instance = new web3.eth.Contract(instanceData.abi);
    let Factory = new web3.eth.Contract(factoryData.abi, factoryData.networks[networkId].address);
    await Factory.methods.getAllInstances().call({from: walletaddress}, (error, instances) => {
        if (instances === null) {
            return [];
        }
        instances.forEach(function (instance) {
            Instance.options.address = instance;
            instancesList.push(Instance.address);
        });
    });
    await asyncForEach(instancesList, async (instance) => {
        Instance.options.address = instance;
        await Instance.methods.getContractData().call({from: walletaddress}, (error, data) => {
            console.log(data);
            instancesData.push(data);
        });
    });

    return instancesData;
}


async function getAllInstancesDataAsync(mnemonic, privatekey, walletaddress) {
    let instancesData = [];
    let instancesDataPromises = [];
    web3.defaultAccount = walletaddress;
    let Instance = new web3.eth.Contract(instanceData.abi);
    let Factory = new web3.eth.Contract(factoryData.abi, factoryData.networks[networkId].address);
    let instancesList = await Factory.methods.getAllInstances().call({from: walletaddress});

    if (instancesList === null) {
        return instancesData;
    }

    await asyncForEach(instancesList, async (instance) => {
        Instance.options.address = instance;
        instancesDataPromises.push(Instance.methods.getContractData().call({from: walletaddress}));
    });

    await Promise.all(instancesDataPromises).then((result) => {
        result.forEach((data) => {
            instancesData.push(data);
        });
    });

    return instancesData;
}

async function create(mnemonic, privatekey, walletaddress, body) {
    web3.defaultAccount = walletaddress;
    let Factory = new web3.eth.Contract(factoryData.abi, factoryData.networks[networkId].address);

    Factory.methods.createNewInstance(
        body.requestId.toString(),
        body.ticketId.toString(),
        body.requestor.toString(),
        body.requestee.toString(),
        body.timestamp.toString(),
        body.currentAppUser.toString(),
        JSON.stringify(body))
        .send({from: walletaddress}, (error, transactionHash) => {
            console.log(transactionHash);
            return transactionHash;
        });
    return "true";
}

async function createSync(mnemonic, privatekey, walletaddress, body) {
    web3.defaultAccount = walletaddress;
    let Factory = new web3.eth.Contract(factoryData.abi, factoryData.networks[networkId].address);

    let deployedContractAddress = undefined;

    let promise = Factory.methods.createNewInstance(
        body.requestId.toString(),
        body.ticketId.toString(),
        body.requestor.toString(),
        body.requestee.toString(),
        body.timestamp.toString(),
        body.currentAppUser.toString(),
        JSON.stringify(body))
        .send({from: walletaddress});

    return promise
        .on('error', (error) => {
            throw new Error("Creation failed")
        })
        .on('receipt', (receipt) => {
            if (receipt.events.Deployed === undefined) {
                promise.reject(new AssetNotFound("Deployment failed"));
            } else {
                deployedContractAddress = receipt.events.Deployed.returnValues._value;
                promise.resolve(deployedContractAddress);
            }
        }).then((result) => {
            return result;
        }).catch((error) => {
            throw new AssetNotFound("Deployment failed");
        });
}

async function update(mnemonic, privatekey, walletaddress, instanceAddress, body) {
    let updatedContractBody = undefined;

    web3.defaultAccount = walletaddress;
    let Instance = new web3.eth.Contract(instanceData.abi, instanceAddress);
    let promise = Instance.methods.updateContractData(
        body.requestId.toString(),
        body.ticketId.toString(),
        body.requestor.toString(),
        body.requestee.toString(),
        body.timestamp.toString(),
        body.currentAppUser.toString(),
        JSON.stringify(body))
        .send({from: walletaddress});

    return promise
        .on('error', (error) => {
            throw new Error("Creation failed")
        })
        .on('receipt', (receipt) => {
            if (receipt.events.Updated === undefined) {
                promise.reject(new AssetNotFound("Update failed"));
            } else {
                updatedContractBody = receipt.events.Updated.returnValues._value[0];
                promise.resolve(updatedContractBody.other);
            }
        }).then((result) => {
            return result;
        }).catch((error) => {
            throw new AssetNotFound("Update failed");
        });
}


async function getByParams(mnemonic, privatekey, walletaddress, params) {
    web3.defaultAccount = walletaddress;
    let data = await getAllInstancesDataAsync(mnemonic, privatekey, walletaddress);
    let validInstances = [];
    await asyncForEach(data, async (instance) => {
        validInstances.push(instance.filter((item) => {
            if (params.requestId) {
                if (parseInt(item.requestId._hex) !== parseInt(params.requestId)) {
                    return false;
                }
            }
            if (params.ticketId) {
                if (item.ticketId !== params.ticketId) {
                    return false;
                }
            }
            if (params.requestor) {
                if (item.requestor !== params.requestor) {
                    return false;
                }
            }
            if (params.requestee) {
                if (item.requestee !== params.requestee) {
                    return false;
                }
            }
            if (params.timestamp) {
                if (item.timestamp !== params.timestamp) {
                    return false;
                }
            }
            if (params.currentAppUser) {
                if (item.currentAppUser !== params.currentAppUser) {
                    return false;
                }
            }
            return true;
        }))
    });

    return validInstances;
}

async function getById(mnemonic, privatekey, walletaddress, address) {
    web3.defaultAccount = walletaddress;
    let Instance = new web3.eth.Contract(instanceData.abi, address);
    return await Instance.methods.getContractData().call({from: walletaddress});
}


module.exports = {
    getAll,
    getAllInstancesData,
    getAllInstancesDataAsync,
    getByParams,
    getById,
    create,
    createSync,
    update,
    apply,
    getApplicationID
};
