pragma solidity ^0.5.0;
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./CarmenWhereaboutsInterface.sol";

/** @title Carmen Sandiego style game. 
 *  @author Jose Redondo Hurtado
 *  @dev Creates a game when you have to find a spy that is travelling through
 *       Europe.
 */
contract CarmenSandiego is Ownable,Pausable{

  // The constructor function is inherited from Ownable
    using SafeMath for uint256;
    
    uint256 prevWhereabout;
    uint256 currWhereabout;
    
    uint256 constant TicketToPlay = 1000;
    uint256 constant MinPrize = 5000;

    address WhereaboutAddr;
    
    /** @dev Only to be called by the owner of the contract, it sets up current
     *       and previous Carmen position. It also points to movement algorithm
     *       contract.
     *  @param _prev Value to be set-up as previous Carmen position
     *  @param _curr Value to be set-up as current Carmen position
     *  @param _whereAddr Address of the movement algorithm contract.
     *  @return None
     */
    function setupCarmen(uint256 _prev, uint256 _curr, address _whereAddr) 
      onlyOwner whenNotPaused
      public payable
    {
      /* MinPrize needs to be paid */
      require (msg.value >= MinPrize);
        prevWhereabout = _prev;
        currWhereabout = _curr;
	WhereaboutAddr = _whereAddr;
    }
    
    
    /** @dev Performs a movement of Carmen Sandiego.
     *  @return None
     */
    function moveCarmen() 
      whenNotPaused public payable
    {
      /* TicketToPlay needs to be paid */
     require (msg.value >= TicketToPlay);

     uint256 aux_curr = currWhereabout;
     /* And it calls the movement algorithm contract */
     currWhereabout = CarmenWhereaboutsInterface(WhereaboutAddr).
       generateDestination(prevWhereabout,currWhereabout);
     /* It moves the current (saved before) to previous whereabout */
     prevWhereabout = aux_curr;
    }
    
     
    /** @dev Returns True if Carmen Sandiego is in the country passed as
     *       parameter and False otherwise.
     *  @param _curr Value to be checked as current Carmen position
     *  @return Boolean with check result
     */
    function isCarmenHere(uint256 _curr) 
      whenNotPaused public payable returns (bool){
      require (msg.value >= TicketToPlay);
        if (_curr == currWhereabout){
	  currWhereabout = CarmenWhereaboutsInterface(WhereaboutAddr).
	    generateDestination(prevWhereabout,currWhereabout);
	  msg.sender.transfer(address(this).balance - TicketToPlay);
	  return true;
        }
	else{
	  return false;
	}
    }

    /** @dev Fallback function that reverts all performed changes.
     *  @return None
     */    
    function() external payable{
        revert();
    }

    /** @dev Returns Carmen Sandiego position.
     *  @return Uint256 pointing to current Carmen position
     */
    function getWhereabout() onlyOwner public view returns (uint256)
    {
      return currWhereabout;
    }
    
    /** @dev Returns contract balance.
     *  @return Uint Contract balance
     */
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    /** @dev Self-destruct contract if needed.
     *  @return None
     */
    function closeContract() onlyOwner whenPaused public payable{
      selfdestruct(msg.sender);
    }
}
