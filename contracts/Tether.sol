// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.0;

contract Tether{
    string public name="Tether";
    string public symbol="USDT";
    uint public totalSuply=1000000000000000000000000;
    uint public decimals=18;
event Transfer(
    address indexed _from,
    address indexed _to,
    uint _value
);
event Approve(
    address indexed _owner,
    address indexed _spender,
    uint _value
);
mapping(address=>uint) public balance;

constructor()public{
    balance[msg.sender]=totalSuply;
}
function transfer(address _to,uint value)public returns(bool success){
require(balance[msg.sender]>=value);
balance[msg.sender]-=value;
balance[_to]+=value;
emit Transfer(msg.sender, _to, value);
return true;
}
}
