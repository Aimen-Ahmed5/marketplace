// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {
// this smart contract will have business logic for 
// a market on blockchain that will buy and sell products and keep track of it (read and write)  

string public name;
uint public productCount = 0;  // will be incremented as product is added
mapping(uint => Product) public products;

struct Product{
    uint id;
    string name;
    uint price;
    address owner;  //who owns the product and will then to buyer who buys the product 
    bool purchased;
}

constructor() public{
    name = "Gem Store";
}

function createProduct() public {
    // check if parametre is correct
    // create product

    //increment product count
    productCount++;
    // trigger an event
}




}