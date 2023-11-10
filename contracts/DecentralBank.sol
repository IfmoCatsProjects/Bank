// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.0;
import './RWD.sol';
import './Tether.sol';


contract DecentralBank {
  string public  name="Decentral Bank";
  address public owner;
    RWD public rwd;
  Tether public tether;
constructor(RWD _rwd,Tether _tether)public{
tether=_tether;
rwd=_rwd;
}
address[] public stakers;
mapping (address=>uint)public stakingBalance;
mapping (address=>bool)public isStaked;
mapping (address=>bool)public hasStaked;

event Deposite(
    address owner,
    address wallet,
    uint permissionedValue
);

function depositTokens(uint _amount)public{
  require(_amount>0,"amount must be positive number");

emit Deposite(msg.sender, address(this),_amount);

tether.transferFrom(msg.sender, address(this), _amount);
stakingBalance[msg.sender]+=_amount;

if (!hasStaked[msg.sender]){
  stakers.push(msg.sender);
}
isStaked[msg.sender]=true;
hasStaked[msg.sender]=true;

}
function issueTokens()public{
require(msg.sender==owner,'caller must be the owner');
for(uint i=0;i<stakers.length;i++){
  address recipient =stakers[i];
  uint balance =stakingBalance[recipient];
  if (balance>0){
     rwd.transfer(recipient, balance);
  }
}
}
function unstakeTokens()public{
  uint balance =stakingBalance[msg.sender];
require(balance>0,'staking balance must be positive number');
tether.transfer(msg.sender, balance);
stakingBalance[msg.sender]=0;
isStaked[msg.sender]=false;
hasStaked[msg.sender]=false;
}
}