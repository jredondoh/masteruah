const SafeMath = artifacts.require("SafeMath");
const CarmenWhereabouts = artifacts.require("CarmenWhereabouts");
const CarmenWhereabouts2 = artifacts.require("CarmenWhereabouts2");
const CarmenSandiego = artifacts.require("CarmenSandiego");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, CarmenWhereabouts);
  deployer.deploy(CarmenWhereabouts);
  deployer.link(SafeMath, CarmenWhereabouts2);
  deployer.deploy(CarmenWhereabouts2);
  deployer.link(SafeMath, CarmenSandiego);
  deployer.deploy(CarmenSandiego);
};
