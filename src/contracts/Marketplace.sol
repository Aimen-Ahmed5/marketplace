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
    uint price;  // item will be purchased in terms of ether (wei) on ethereum platform 
    address owner;  //who owns the product and will then to buyer who buys the product 
    bool purchased;
}

event productCreated(
     uint id,
    string name,
    uint price,  
    address owner,  
    bool purchased
);

constructor() public{
    name = "Gem Store";
}

function createProduct(string memory _name, uint _price) public {
    // require valid name
    require(bytes(_name).length >0, "Invalid name");

    //require valid price
    require(_price >0, "Invalid amount");

    //increment product count
    productCount++;
     // create product
     products[productCount] = Product(productCount, _name, _price, msg.sender, false);
    // trigger an event through event
    emit productCreated(productCount, _name, _price, msg.sender, false);
}

function purchaseProduct(uint _id) public {

    
} 


}