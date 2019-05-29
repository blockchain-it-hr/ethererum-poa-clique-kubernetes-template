pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

contract Instance {

    address manager;
    json[] jsonData;

    struct json {
        uint id;
        string other;
    }


    event Updated(
        json[] _value
    );

    modifier onlyOwner(){
        require(msg.sender == manager, 'Contract can only be changed by owner!');
        _;
    }

    constructor(address _sender, uint _id, string memory _other) public {
        manager = _sender;
        jsonData.push(json({
            id : _id,
            other : _other
            })
        );
    }

    function updateContractData(uint _id, string memory _other) public onlyOwner returns (json memory) {
        jsonData.push(json({
            id : _id,
            other : _other
            })
        );

        emit Updated(jsonData);
        
    }

    function getContractData() public view returns (json[] memory){
        return jsonData;
    }

}