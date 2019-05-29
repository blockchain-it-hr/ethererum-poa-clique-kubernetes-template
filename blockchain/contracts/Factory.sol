pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
import './Instance.sol';

contract Factory {

    struct json {
        uint id;
        string other;
    }

    event Deployed(
        address _value
    );

    address manager;
    Instance[] instances;

    constructor() public {
        manager = msg.sender;
    }

    function createNewInstance(uint id, string memory other) public returns (Instance) {
        Instance instance = new Instance(msg.sender, id, other);
        instances.push(instance);
        emit Deployed(address(instance));
    }

    function getAllInstances() public view returns (Instance[] memory) {
        return instances;
    }
}