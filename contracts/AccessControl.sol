// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract AccessControl  {
    address public ceoAddress;
    address public cooAddress;

    bool public paused = false;

    modifier onlyCEO() {
        require(msg.sender == ceoAddress);
        _;
    }

    modifier onlyCOO() {
        require(msg.sender == cooAddress);
        _;
    }

    modifier onlyCLevel() {
        require(
            msg.sender == ceoAddress ||
            msg.sender == cooAddress
        );
        _;
    }

    function setCEO(address newCEO) external onlyCEO {
        require(newCEO != address(0));
        ceoAddress = newCEO;
    }

    function setCOO(address newCOO) external onlyCOO {
        require(newCOO != address(0));
        cooAddress = newCOO;        
    }

    /// Pausable functionallities
    modifier whenPaused() {
        require(paused);
        _;
    }

    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    function pause() external whenNotPaused onlyCLevel {
        paused = true;
    }

    function unpause() external whenPaused onlyCLevel {
        paused = false;
    }
}