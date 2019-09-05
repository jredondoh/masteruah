pragma solidity ^0.5.0;

/** @title Carmen Sandiego movement algorithm interface. 
 *  @author Jose Redondo Hurtado
 *  @dev Interface to be implemented by movement algorithm libraries.
 */
contract CarmenWhereaboutsInterface{
    /** @dev Generates new Carmen Sandiego position.
     *  @param prevDestination Previous Carmen whereabout
     *  @param currDestination Current Carmen whereabout
     *  @return Uint256 pointing to future Carmen position
     */    
    function generateDestination(uint256 prevDestination, uint256 currDestination) 
      public pure returns (uint256);
}
