
// SPDX-License-Identifier: GPL-3.0
import "./Tether.sol";

pragma solidity ^0.5.0;
contract Migrations{
    address public owner;
    uint public last_completed_migration;
    constructor() public{
        owner=msg.sender;
    } 
modifier Owner(){
    require(msg.sender==owner);
    _;
}
function setCompleted(uint completed)public Owner{
    last_completed_migration=completed;
}
function upgrade (address new_address)public Owner{
    Migrations upgraded=Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);

}
