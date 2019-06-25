pragma solidity ^0.5;

contract SimpleStorage {
  uint myVariable;

  function set(uint x) public {
    myVariable = x;
  }

  function get() public returns (uint) {
    return myVariable;
  }
}