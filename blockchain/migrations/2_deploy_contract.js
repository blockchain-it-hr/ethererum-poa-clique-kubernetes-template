let Ballot = artifacts.require("Ballot.sol");

module.exports = function (deployer) {
    deployer.deploy(Ballot)
};