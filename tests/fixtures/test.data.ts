export const updateDidDocument = ''

export const privateKey =
  '0ea046d14744e1e5dd05fc1ca1ba3de78466cb02750ce4418e038786c0bb6b46'

export const network = 'testnet'


export const resourceJson =   
{
  "resourceURI": "did:polygon:testnet:0x07D796042a38699CC8096750a7ff6f0A629D6d7C/resources/398cee0a-efac-4643-9f4c-74c48c72a14b",
  "resourceCollectionId": "55dbc8bf-fba3-4117-855c-1e0dc1d3bb47",
  "resourceId": "398cee0a-efac-4643-9f4c-74c48c72a14b",
  "resourceName": "Eventbrite1 Logo",
  "resourceType": "image/png",
  "mediaType": "image/svg+xml",
  "created": "2022-11-17T08:10:36Z",
  "checksum": "a95380f460e63ad939541a57aecbfd795fcd37c6d78ee86c885340e33a91b559",
  "previousVersionId": null,
  "nextVersionId": null
}

export const testResourceId = 'a2e3e176-2111-4e8f-85ab-699f4e17e296' // Add your test resourceId

export const abi = [ // smart contract ABI
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "resourceId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_json",
				"type": "string"
			}
		],
		"name": "addResources",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_doc",
				"type": "string"
			}
		],
		"name": "createDID",
		"outputs": [
			{
				"internalType": "address",
				"name": "controller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "created",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "updated",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "didDoc",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "deleteDIDDoc",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "doc",
				"type": "string"
			}
		],
		"name": "DIDCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "id",
				"type": "address"
			}
		],
		"name": "DIDDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "doc",
				"type": "string"
			}
		],
		"name": "DIDUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "TransferOwnership",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_doc",
				"type": "string"
			}
		],
		"name": "updateDIDDoc",
		"outputs": [
			{
				"internalType": "address",
				"name": "controller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "created",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "updated",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "didDoc",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "getDIDDoc",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getDIDDOcByIndex",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "getResourcesById",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "resourceId",
				"type": "string"
			}
		],
		"name": "getResourcesByIdAndResourceId",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalNumberOfDeletedDIDs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_deletedDID",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalNumberOfDIDs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_totalDIDs",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_activeDIDs",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const testDidDetails = {
  address: '0x07D796042a38699CC8096750a7ff6f0A629D6d7C',
  did:'did:polygon:testnet:0x07D796042a38699CC8096750a7ff6f0A629D6d7C',
  privateKey: '0ea046d14744e1e5dd05fc1ca1ba3de78466cb02750ce4418e038786c0bb6b46', //test key
  publicKeyBase58 : '7Lnm1Zi2K75KVgHPrHADCpfa9cLAtRRocBgLsFVLw5NRPUgoLBBv1Se8ttjx4P7fXfNS5gazJmKqohNmwEqx8VjDYfPvw'

}

export const testContractDetails = {
  schemaManagerContract: '0x67e8223D80aEcb337FE8D90dD41845A0DA31B4b0',
  contractAddress: '0xEd585f0A823E4Dccbad9ae402c1235E69Fa0987C',
  networkUrl: 'https://rpc-mumbai.maticvigil.com'
}

export const schemaAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "newSchemaId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_json",
				"type": "string"
			}
		],
		"name": "createSchema",
		"outputs": [
			{
				"internalType": "string",
				"name": "schemaId",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "schemaId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "schemaJson",
				"type": "string"
			}
		],
		"name": "SchemaCreate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "TransferOwnership",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_schemaId",
				"type": "string"
			}
		],
		"name": "getSchemaById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "schemaJson",
						"type": "string"
					}
				],
				"internalType": "struct SchemaRegistry.Schema",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "schemas",
		"outputs": [
			{
				"internalType": "string",
				"name": "schemaJson",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]