// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.0;
//token 
contract Tether{
    string public name="Mock Tether Token";
    string public symbol="USDT";
    uint public totalSuply=1000000000000000000000000;//100 ETH


event Transfer(
    address indexed _from,
    address indexed _to,
    uint _value,
    bool  result
);
event Approve(
    address owner,
    uint permissionedValue
);
function approve(address sender,uint value)public returns (bool success){

permissionedValueToSend[msg.sender][sender]=value;
emit Approve(sender, value);
    return true;
}

mapping(address=>uint) public balance;

constructor()public{
    balance[msg.sender]=totalSuply;
}
mapping(address=>mapping(address=>uint))public permissionedValueToSend; 

function transfer(address _to,uint value)public returns(bool success){
require(balance[msg.sender]>=value && value>0,'Error during transfering.Value is incorrect');
balance[msg.sender]-=value;
balance[_to]+=value;
emit Transfer(msg.sender, _to, value,true);
return true;
}
function transferFrom(address _from,address _to,uint value)public returns(bool success){
require(permissionedValueToSend[msg.sender][_from]>=value,"Error,maximum amount of  money has been  already sent");
require(balance[msg.sender]>=value && value>0,'Error during transfering.Value is incorrect');
balance[_from]-=value;
permissionedValueToSend[msg.sender][_from]-=value;
balance[_to]+=value;
emit Transfer(_from, _to, value,true);
return true;
}
}
