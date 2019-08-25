pragma solidity ^0.5.0;
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @dev Wrappers over Carmen Sandiego trip destinations in order
 *      to be able to generate new versions of the game without
 *      changing the initial interface.
 */
library CarmenWhereabouts_1_0 {
    using SafeMath for uint256;
    
    uint256 constant NumDestinations = 6;

    function generateDestination(uint256 prevDestination, uint256 currDestination) 
    public pure returns (uint256){
        currDestination = SafeMath.add(prevDestination,currDestination);
        currDestination = SafeMath.mod(currDestination,NumDestinations);
        return currDestination;
    }
}
