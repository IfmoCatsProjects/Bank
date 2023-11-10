// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.0;
import 'contracts/RWD.sol';
import 'contracts/Tether.sol';


contract DecentralBank {
  string public  name="Niga Bank";
  address public owner;
    RWD public rwd;
  Tether public tether;
constructor(RWD _rwd,Tether _tether)public{
tether=_tether;
rwd=_rwd;
}
}
