// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Ownable {    
    address private _owner;

    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    constructor () {
        _owner = msg.sender;        
        emit OwnerSet(address(0), _owner);
    }
    
    function getOwner() external view returns(address) {
        return _owner;
    }

    modifier onlyOwner(){
        require(msg.sender == _owner);
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner != address(0)){
            _owner = newOwner;
        }
    }
}