module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 33000,
      from: "0xb9225c26f0390cc7eb9d9f530c423175f4273012", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  }
};
