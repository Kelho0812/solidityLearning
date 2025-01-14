import { createWalletClient, createPublicClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

// Your contract details
const CONTRACT_ADDRESS = '0x3d897B6143f9099434A5Ab6eBa7B0E5Da91d2C34'; // Replace with your calculator contract's address
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "player1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "player2",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "pointsTeamA",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pointsTeamB",
				"type": "uint256"
			}
		],
		"name": "storeTournamentDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getTournamentDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "player1",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "player2",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "pointsPlayer1",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pointsPlayer2",
						"type": "uint256"
					}
				],
				"internalType": "struct tournamentResults.tournamentDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tournamentsMap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "player1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "player2",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "pointsPlayer1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pointsPlayer2",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Your private key
const PRIVATE_KEY = '0x1757d298804e7c375374a8634fb54749135591dcaa39047e0859f2b580a07adf';

// Derive the account from the private key
const account = privateKeyToAccount(PRIVATE_KEY);

// Create the wallet client for writing transactions
const walletClient = createWalletClient({
	account, // Use the derived account
	chain: sepolia, // Replace with your chain (e.g., Sepolia Testnet)
	transport: http('https://sepolia.infura.io/v3/dcbc4fed247e4ddc839e1860a449407b'),
});

// Create the public client for reading contract data
const publicClient = createPublicClient({
	chain: sepolia, // Replace with your chain (e.g., Sepolia Testnet)
	transport: http('https://sepolia.infura.io/v3/dcbc4fed247e4ddc839e1860a449407b'),
});

async function callAddFunction(valueToAdd) {
	try {
		console.log('Sending transaction...');

		const tx = await walletClient.writeContract({
			address: CONTRACT_ADDRESS,
			abi: CONTRACT_ABI,
			functionName: 'storeTournamentDetails',
			args: [valueToAdd, "ze", "artur", 5, 10],
		});

		console.log('Transaction sent:', tx);
		alert(`Transaction successful! TX Hash: ${tx}`);
	} catch (error) {
		console.error('Transaction failed:', error);
		alert('Transaction failed! Check the console for details.');
	}
}


// Setup event listeners for the buttons
document.getElementById('addButton').addEventListener('click', async () => {
	const inputValue = parseInt(document.getElementById('inputValue').value, 10);
	await callAddFunction(inputValue);
});