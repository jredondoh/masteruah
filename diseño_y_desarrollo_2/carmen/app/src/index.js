import Web3 from "web3";
import metaCoinArtifact from "../../build/contracts/CarmenSandiego.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = metaCoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      const playerAddrElement = document.getElementsByClassName("player_addr")[0];
      playerAddrElement.innerHTML = this.account;    
      this.refreshBalance();
      
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  refreshBalance: async function() {
    const { getBalance } = this.meta.methods;
    const balance = await getBalance().call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  getWhere: async function() {
    const { getWhereabout } = this.meta.methods;
    const where = await getWhereabout().call();

    const currWhereElement = document.getElementsByClassName("currWhere")[0];
    currWhereElement.innerHTML = where;
  },

  setup: async function() {
    const prev = parseInt(document.getElementById("prev").value);
    const curr = parseInt(document.getElementById("curr").value);
    const algorithm = document.getElementById("algorithm_addr").value;

    this.setStatus("Initiating transaction... (please wait)");

    const { setupCarmen } = this.meta.methods;
    await setupCarmen(prev,curr,algorithm).send({ value: 5000,from: this.account });

    this.setStatus("Transaction complete!");
    this.refreshBalance();
  },

  move: async function() {
    this.setStatus("Initiating transaction... (please wait)");

    const { moveCarmen } = this.meta.methods;
    await moveCarmen().send({ value: 1000,from: this.account });

    this.setStatus("Transaction complete!");
    this.refreshBalance();
  },

  guess: async function() {
    const isHere = parseInt(document.getElementById("guessWhere").value);

    this.setStatus("Initiating transaction... (please wait)");

    const { isCarmenHere } = this.meta.methods;
    await isCarmenHere(isHere).send({ value: 1000,from: this.account });

    this.setStatus("Transaction complete!");
    this.refreshBalance();
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
