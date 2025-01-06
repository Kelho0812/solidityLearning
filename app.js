// app.js
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "add",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "multiply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "subtract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "result",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contractAddress = "0x4E0EE2c701E1236918EF807b9f6829445fEa2BBb";

let web3;
let contract;
let accounts;

async function connectWallet() {
	if (window.ethereum) {
		web3 = new Web3(window.ethereum);
		accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
		contract = new web3.eth.Contract(contractABI, contractAddress);
		alert(`Wallet connected: ${accounts[0]}`);
		updateResult();
	} else {
		alert("Please install MetaMask!");
	}
}

async function updateResult() {
	if (contract) {
		const result = await contract.methods.get().call();
		document.getElementById("result").innerText = result;
	}
}

async function callContractMethod(method, num) {
	if (contract && accounts) {
		try {
			await contract.methods[method](num).send({ from: accounts[0] });
			updateResult();
		} catch (error) {
			console.error(error);
			alert("Transaction failed!");
		}
	} else {
		alert("Please connect your wallet first!");
	}
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("addBtn").addEventListener("click", () => {
	const num = document.getElementById("numberInput").value;
	callContractMethod("add", parseInt(num));
});
document.getElementById("subtractBtn").addEventListener("click", () => {
	const num = document.getElementById("numberInput").value;
	callContractMethod("subtract", parseInt(num));
});
document.getElementById("multiplyBtn").addEventListener("click", () => {
	const num = document.getElementById("numberInput").value;
	callContractMethod("multiply", parseInt(num));
});
