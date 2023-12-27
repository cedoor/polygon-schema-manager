import { testDidDetails, resourceJson, testResourceId, updateDidDocument, testContractDetails } from './fixtures/test.data'
import { describe, it, before } from 'node:test'
import assert from 'node:assert'
import { arrayHasKeys } from './utils/array'
import { PolygonDID } from '../src/schema-manager'

const NETWORK_URL = testContractDetails.networkUrl
const DID_REGISTRAR_CONTRACT_ADDRESS = testContractDetails.contractAddress //Can add external smart contract
const SCHEMA_MANAGER_CONTRACT_ADDRESS =  testContractDetails.schemaManagerContract

describe('Registrar', () => {
  let polygonSchemaManager: PolygonDID
  let polygonDID: any
  let keyPair: {
    address: string
    privateKey: string
    publicKeyBase58: string
    did: string
  } = {
    address: '',
    privateKey: '',
    publicKeyBase58: '',
    did: ''
  };

  before(async () => {

    polygonDID = testDidDetails.did
    polygonSchemaManager = new PolygonDID({
      contractAddress: DID_REGISTRAR_CONTRACT_ADDRESS,
      schemaManagerContractAddress: SCHEMA_MANAGER_CONTRACT_ADDRESS,
      rpcUrl: NETWORK_URL,
      privateKey: testDidDetails.privateKey,
    })
    await new Promise((r) => setTimeout(r, 5000))
  })

  
  
  describe('test register schema function', () => {
    let addResource: any;

    before(async () => {
      const addSchema = await polygonSchemaManager.createSchema(
        testDidDetails.did,
        resourceJson
      )
    })
    
    it('should get transaction hash after register DID document', async () => {
      assert.ok(addResource.txnHash)
      assert.equal(
        arrayHasKeys(Object.keys(addResource.txnHash), [
          'nonce',
          'gasPrice',
          'gasLimit',
          'to',
          'value',
          'data',
          'chainId',
          'v',
          'r',
          's',
          'from',
          'hash',
          'type',
          'wait',
        ]),
        true,
      )
    })


  })
})