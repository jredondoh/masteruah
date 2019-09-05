const CarmenSandiego = artifacts.require("CarmenSandiego");
// Following constants must be adapted with migration contract addresses
const algorithm_addr1 = "0x021b872ebE9cF8D024f4c1E75ea781E297267A57";
const algorithm_addr2 = "0x2D43B697a75Bd3a320c698648771412a6a5378Ce";
contract("CarmenSandiego", accounts => {
  beforeEach( async function() {
    instance = await CarmenSandiego.deployed();
  });

  it("should create a game contract and we should be owners", async () => {
    // Check that isOwner function works properly
    const _owner = await instance.isOwner.call({from: accounts[0]});
    assert.equal(_owner.valueOf(), true, "We are the owners of the contract");
    const not_owner = await instance.isOwner.call({from: accounts[1]});
    assert.equal(not_owner.valueOf(), false, "Only account[0] is the owner of the contract");
  });
  it("setup system", async () => {
    const _whereabout0 = await instance.getWhereabout.call();
    assert.equal(_whereabout0.valueOf(), 0, "getWhereabout returns 0 until setup");    
    instance.setupCarmen(1,1,algorithm_addr1,{from: accounts[0], value:5000});
    // Current whereabout is updated after setupCarmen call is executed and contract balance increased
    const _whereabout1 = await instance.getWhereabout.call();
    assert.equal(_whereabout1.valueOf(), 1, "getWhereabout returns setup value");    
    const _balance = await instance.getBalance.call();
    assert.equal(_balance.valueOf(), 5000, "5000 weis in the contract");
  });
  it("check 1st movement algorithm", async () => {
    const _balance = await instance.getBalance.call();
    assert.equal(_balance.valueOf(), 5000, "Initial 5000 weis in the contract");
    instance.setupCarmen(1,1,algorithm_addr1,{from: accounts[0], value:5000});
    const _whereabout1 = await instance.getWhereabout.call();
    assert.equal(_whereabout1.valueOf(), 1, "getWhereabout returns setup value");
    // After setup is checked, the movement works as expected and current whereabout is updated
    instance.moveCarmen({from: accounts[0], value:1000});
    const _whereabout2 = await instance.getWhereabout.call();
    assert.equal(_whereabout2.valueOf(), 2, "1st movement algorithm works as expected"); 
    instance.moveCarmen({from: accounts[1], value:1000});
    const _whereabout3 = await instance.getWhereabout.call();
    assert.equal(_whereabout3.valueOf(), 3, "1st movement algorithm works as expected and not owner can perform movements"); 
    const _balance2 = await instance.getBalance.call();
    assert.equal(_balance2.valueOf(), 12000, "12000 weis in the contract");
  });
  it("check 2nd movement algorithm", async () => {
    const _balance = await instance.getBalance.call();
    assert.equal(_balance.valueOf(), 12000, "Initial 12000 weis in the contract");
    instance.setupCarmen(1,1,algorithm_addr2,{from: accounts[0], value:5000});
    const _whereabout1 = await instance.getWhereabout.call();
    assert.equal(_whereabout1.valueOf(), 1, "getWhereabout returns setup value");    
    // After setup is checked, the movement works as expected and current whereabout is updated
    // Notice that this movement algorithm is not the same as previous
    instance.moveCarmen({from: accounts[0], value:1000});
    const _whereabout2 = await instance.getWhereabout.call();
    assert.equal(_whereabout2.valueOf(), 3, "1st movement algorithm works as expected"); 
    instance.moveCarmen({from: accounts[1], value:1000});
    const _whereabout3 = await instance.getWhereabout.call();
    assert.equal(_whereabout3.valueOf(), 5, "1st movement algorithm works as expected and not owner can perform movements"); 
    const _balance2 = await instance.getBalance.call();
    assert.equal(_balance2.valueOf(), 19000, "19000 weis in the contract");
  });    
  it("check isCarmenHere method and prizes", async () => {
    const _balance = await instance.getBalance.call();
    assert.equal(_balance.valueOf(), 19000, "Initial 19000 weis in the contract");
    instance.setupCarmen(1,1,algorithm_addr2,{from: accounts[0], value:5000});
    const _whereabout1 = await instance.getWhereabout.call();
    assert.equal(_whereabout1.valueOf(), 1, "getWhereabout returns setup value");
    // When called with an incorrect guess, contract balance keeps increasing
    await instance.isCarmenHere(2,{from: accounts[0], value:1000});
    const _balance2 = await instance.getBalance.call();
    assert.equal(_balance2.valueOf(), 25000, "Balance after incorrect guess 25000 weis in the contract");
    // When called with a correct guess, contract transfers all funds but 1000 to winner
    await instance.isCarmenHere(1,{from: accounts[0], value:1000});
    const _balance3 = await instance.getBalance.call();
    assert.equal(_balance3.valueOf(), 1000, "Balance after correct guess 1000 weis in the contract");
  });
  it("check pause and unpause behaviour", async () => {
    instance.setupCarmen(1,1,algorithm_addr2,{from: accounts[0], value:5000});
    const _balance = await instance.getBalance.call();
    assert.equal(_balance.valueOf(), 6000, "Initial 6000 weis in the contract");
    // This test checks that WhenNotPaused methods throws error when paused
    instance.pause();
    const PREFIX = "Returned error: VM Exception while processing transaction:";
    const expectedMsg =" revert Pausable: paused";
    try{
      await instance.moveCarmen.call({from: accounts[1], value:1000});    
    } catch (e) {
      assert(e.message.startsWith(PREFIX + expectedMsg),"expected an error");
    }
    try{
      await instance.isCarmenHere.call(1,{from: accounts[1], value:1000});    
    } catch (e) {
      assert(e.message.startsWith(PREFIX + expectedMsg),"expected an error");
    }
    try{
      await instance.setupCarmen.call(1,1,algorithm_addr1,{from: accounts[0], value:5000});    
    } catch (e) {
      assert(e.message.startsWith(PREFIX + expectedMsg),"expected an error");
    }
    // After unpause system, the methods can be called again
    instance.unpause();
    instance.setupCarmen(1,2,algorithm_addr2,{from: accounts[0], value:11000});
    const _whereabout1 = await instance.getWhereabout.call();
    assert.equal(_whereabout1.valueOf(), 2, "getWhereabout returns setup value");    
  });
  it("check owner protection", async () => {
    // This test checks the owner protection, as an OnlyOwner method is called from not the owner
    const PREFIX = "Returned error: VM Exception while processing transaction:";
    const expectedMsg =" revert Ownable: caller is not the owner";
    try{
      await instance.setupCarmen.call(1,1,algorithm_addr1,{from: accounts[1], value:5000});    
    } catch (e) {
      assert(e.message.startsWith(PREFIX + expectedMsg),"expected an error");
    }
  });
  it("check minimum values in calls", async () => {
    // Several methods have a minimum value to be included in call. This test tries to break that minimum required.
    const PREFIX = "Returned error: VM Exception while processing transaction:";
    const expectedMsg =" revert";
    try{
      await instance.setupCarmen.call(1,1,algorithm_addr1,{from: accounts[0], value:1000});    
    } catch (e) {
      assert(e.message.startsWith(PREFIX + expectedMsg),"expected an error");
    }
    try{
      await instance.moveCarmen.call({from: accounts[0], value:100});    
    } catch (e) {
      assert(e.message.startsWith(PREFIX + expectedMsg),"expected an error");
    }
    try{
      await instance.isCarmenHere.call(1,{from: accounts[0], value:100});    
    } catch (e) {
      assert(e.message.startsWith(PREFIX + expectedMsg),"expected an error");
    }
  });
  it("check close contract", async () => {
    instance.pause();
    await instance.closeContract({from: accounts[0]});
    // no exception expected as closeContract is called after pause the system
  });
});
