pragma solidity ^0.5.0;
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/** @title Carmen Sandiego movement algorithm library. 
 *  @author Jose Redondo Hurtado
 *  @dev Library that implements movement algorithm of the Carmen Sandiego game
 */
library CarmenWhereabouts{
    using SafeMath for uint256;
    
    uint256 constant NumDestinations = 6;

    /** @dev Generates new Carmen Sandiego position.
     *  @param prevDestination Previous Carmen whereabout
     *  @param currDestination Current Carmen whereabout
     *  @return Uint256 pointing to future Carmen position
     */    
    function generateDestination(uint256 prevDestination, uint256 currDestination) 
    public pure returns (uint256){
        currDestination = SafeMath.add(prevDestination,currDestination);
        currDestination = SafeMath.mod(currDestination,NumDestinations);
        return currDestination;
    }
}
