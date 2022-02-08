// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {
// this smart contract will have business logic for 
// a market on blockchain that will buy and sell products and keep track of it (read and write)  

string public name;

constructor() public{
    name = "Gem Store";
}
}