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
    address payable owner;  //who owns the product and will then to buyer who buys the product 
    bool purchased;
}

event productCreated(
    uint id,
    string name,
    uint price,  
    address payable owner,  
    bool purchased
);

event productPurchased(
    uint id,
    string name,
    uint price,  
    address payable owner,  
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

// product id is given as argument and instance of that product will be created  
function purchaseProduct(uint _id) public payable {

    //fetch product, Product is instantiated 
    Product memory _product = products[_id];

    //fetch owner
    address payable _seller = _product.owner;

    //check for valid product


    //convert seller to buyer ( who is calling is function)
    _product.owner = msg.sender;

    //purchase it
    _product.purchased = true;

    //update product status in mapping
    products[_id] = _product;

    // transfer 10% of the amount to another account/ wallet


    //paying seller by sending ether
    address(_seller).transfer(msg.value);

    //trigger an event
    emit productPurchased(productCount, _product.name, _product.price, msg.sender, true);
} 


}