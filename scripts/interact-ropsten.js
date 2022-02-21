const { joinSignature } = require("ethers/lib/utils");
const hre = require("hardhat");
const USElection = require('../artifacts/contracts/USElection.sol/USElection.json')

const run = async function() {
	// const provider = new hre.ethers.providers.JsonRpcProvider("http://localhost:8545")
	const provider = new hre.ethers.providers.InfuraProvider("ropsten", "dd0b0425f5eb45e78d52071d75f6c147")
	// const provider = new hre.ethers.providers.InfuraProvider("ropsten", "40c2813049e44ec79cb4d7e0d18de173")

	const wallet = new hre.ethers.Wallet("a425cc857ba34792352eec57f7006098d4a39b1b7b6e6178094655ea628e3af6", provider)
	const balance = await wallet.getBalance();

	const electionContract = new hre.ethers.Contract("0x0d5eA06602ce9f1D96145B5b520D1975aE3817F0", USElection.abi, wallet)
	
	const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
	const transactionReceipt = await transactionOhio.wait();
	if (transactionReceipt.status != 1) {
		console.log("Transaction was not successful")
		return 
	}

	const resultsSubmittedOhioNew = await electionContract.resultsSubmited("Ohio")
	console.log("Results submitted for Ohio", resultsSubmittedOhioNew);

	const currentLeader = await electionContract.currentLeader();
	console.log("Current leader", currentLeader);
}

run()