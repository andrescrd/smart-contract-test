// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./AccessControl.sol";

contract Market is AccessControl {

    struct Customer {
        uint loyaltyPoint;
        uint totalItems;
    }

    struct Product {
        string name;
        uint price;
    }

    uint etherPerPoint = 0.005 ether;

    Product[] public products;
    mapping(address => Customer) public customers;
    mapping(address => Product[]) public customerProducts;
    mapping(address => uint) public customerTotalProducts;

    event ProductPurchased(address indexed customer, uint price);

    constructor(){
        products.push(Product("Test", 0.5 ether));
        products.push(Product("Test 2", 0.1 ether));
        products.push(Product("Test 3", 0.01 ether));
    }
    
    function setEtherPerPoint(uint newEtherPerPoint) external onlyCLevel {
        etherPerPoint = newEtherPerPoint;
    }

    function buyProduct(uint productIndex) public payable {
        Product memory product = products[productIndex];
        require(msg.value == product.price);

        Customer storage customer = customers[msg.sender];
        customer.loyaltyPoint += 5;
        customer.totalItems += 1;
        customerProducts[msg.sender].push(product);
        customerTotalProducts[msg.sender]++;

        emit ProductPurchased(msg.sender, product.price);
    }

    function totalProducts() view public returns (uint) {
        return products.length;
    }

    function reedemLoyaltyPoint() public {
        Customer storage customer = customers[msg.sender];
        uint etherToRefound = etherPerPoint * customer.loyaltyPoint;
        payable(msg.sender).transfer(etherToRefound);
        customer.loyaltyPoint = 0;
    }

    function getCompanyBalance() view public onlyCLevel returns (uint) {
        return address(this).balance;
    }

    function getRefundableEther() view public returns (uint) {
        return etherPerPoint * customers[msg.sender].loyaltyPoint;
    }
}