const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy-testnets", "Deploys contract on a provided network")
    .setAction(async () => {
        const deployElectionContract = require("./scripts/deploy");
        await deployElectionContract();
        await hre.run('print', {message: "Done!"})
    });

subtask("print", "Prints a message")
    .addParam("message", "The message to print")
    .setAction(async (taskArgs) => {
      console.log(taskArgs.message);
    });

task("deploy-mainnet", "Deploys contract on a provided network")
  .addParam("privateKey", "Please provide the private key")
  .setAction(async ({privateKey}) => {
    const deployElectionContract = require("./scripts/deploy-with-params");
    await deployElectionContract(privateKey);
  });
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    ropsten: {
      url : "https://ropsten.infura.io/v3/dd0b0425f5eb45e78d52071d75f6c147",
      // url: "https://ropsten.infura.io/v3/40c2813049e44ec79cb4d7e0d18de173",
      accounts: ["a425cc857ba34792352eec57f7006098d4a39b1b7b6e6178094655ea628e3af6"]      
    },
    // etherscan: {
    //   apiKey: {
    //     ropsten: 'BRDQPJCF3U1VNGCQ5I972N6UWZW9TDFU48'
    //   }
    // }
  
    // etherscan: {
    //   url: "https://ropsten.etherscan.io/",
    //   // Your API key for Etherscan
    //   // Obtain one at https://etherscan.io/
    //   // The network you want to use
    //   // network: "ropsten",
    //   apiKey: "BRDQPJCF3U1VNGCQ5I972N6UWZW9TDFU48" 
    // }
  },
};

