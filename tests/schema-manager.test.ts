import {
  testDidDetails,
  resourceJson,
  testResourceId,
  updateDidDocument,
  testContractDetails,
  testSchemaSample,
  fileServerUrl,
  fileServerAccessToken,
} from './fixtures/test.data'
import { describe, it, before } from 'node:test'
import assert from 'node:assert'
import { arrayHasKeys } from './utils/array'
import { PolygonSchema } from '../src/schema-manager'
import axios from 'axios'

const NETWORK_URL = testContractDetails.networkUrl
const DID_REGISTRAR_CONTRACT_ADDRESS = testContractDetails.contractAddress //Can add external smart contract
const SCHEMA_MANAGER_CONTRACT_ADDRESS =
  testContractDetails.schemaManagerContract

describe('Registrar', () => {
  let polygonSchemaManager: PolygonSchema
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
    did: '',
  }

  before(async () => {
    polygonDID = testDidDetails.did
    polygonSchemaManager = new PolygonSchema({
      contractAddress: DID_REGISTRAR_CONTRACT_ADDRESS,
      schemaManagerContractAddress: SCHEMA_MANAGER_CONTRACT_ADDRESS,
      rpcUrl: NETWORK_URL,
      privateKey: testDidDetails.privateKey,
      serverUrl: fileServerUrl,
      fileServerToken: fileServerAccessToken
    })
    await new Promise((r) => setTimeout(r, 5000))
  })

  describe('test register schema function', () => {
    let addedSchema: any

    before(async () => {
      addedSchema = await polygonSchemaManager.createSchema(
        testDidDetails.did,
        testSchemaSample,
      )
    })

    it('should get transaction hash after register DID document', async () => {
      assert.ok(addedSchema.schematxnReceipt)
      assert.equal(
        arrayHasKeys(Object.keys(addedSchema.schematxnReceipt), [
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
