let fs = require("fs");
const path = require('path');

//TODO: When users are implemented update this part without hardcoded strings!
async function getWalletForUser(username) {
    username = "test"; //TODO: move to env variables
    const walletPath = path.join(__dirname, '../../wallet/', username);
    let mnemonic, privatekey, walletaddress;
    let files = fs.readdirSync(walletPath);
    files.forEach(function (file) {
        if (file.split('.')[1] === 'mnemonic') {
            mnemonic = fs.readFileSync(path.join(walletPath, file)).toString();
        }
        if (file.split('.')[1] === 'privatekey') {
            privatekey = fs.readFileSync(path.join(walletPath, file)).toString();
        }
        if (file.split('.')[1] === 'walletaddress') {
            walletaddress = fs.readFileSync(path.join(walletPath, file)).toString();
        }
    });

    return {
        mnemonic: mnemonic,
        privatekey: privatekey,
        walletaddress: walletaddress
    };
}


module.exports = {
    getWalletForUser
};