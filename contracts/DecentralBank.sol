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
}
