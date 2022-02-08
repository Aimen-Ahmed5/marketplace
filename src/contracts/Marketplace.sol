// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {
// this smart contract will have business logic for 
// a market on blockchain that will buy and sell products and keep track of it (read and write)  

string public name;

struct Product{
    uint id;
    string name;
    uint price;
     address owner;  //who owns the product and will then to buyer who buys the product 

}

constructor() public{
    name = "Gem Store";
}





}