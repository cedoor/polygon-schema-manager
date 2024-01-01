import {
  testDidDetails,
  testContractDetails,
  fileServerUrl,
  fileServerAccessToken,
  testSchemaId,
} from './fixtures/test.data'
import { describe, it, before } from 'node:test'
import assert from 'node:assert'
import { arrayHasKeys } from './utils/array'
import { PolygonSchema } from '../src/schema-manager'

const NETWORK_URL = testContractDetails.networkUrl
const DID_REGISTRAR_CONTRACT_ADDRESS = testContractDetails.contractAddress
const SCHEMA_MANAGER_CONTRACT_ADDRESS =
  testContractDetails.schemaManagerContract

describe('Registrar', () => {
  let polygonSchemaManager: PolygonSchema
  let polygonDID: string

  before(async () => {
    polygonDID = testDidDetails.did
    polygonSchemaManager = new PolygonSchema({
      contractAddress: DID_REGISTRAR_CONTRACT_ADDRESS,
      schemaManagerContractAddress: SCHEMA_MANAGER_CONTRACT_ADDRESS,
      rpcUrl: NETWORK_URL,
      privateKey: testDidDetails.privateKey,
      serverUrl: fileServerUrl,
      fileServerToken: fileServerAccessToken,
    })
    await new Promise((r) => setTimeout(r, 5000))
  })

  let registeredSchemaDetails: any

  before(async () => {
    registeredSchemaDetails = await polygonSchemaManager.createSchema(
      testDidDetails.did,
      'PAN CARD',
    )
    console.log('registeredSchemaDetails::::', registeredSchemaDetails)
  })

  it('should get transaction hash after registering schema with non-empty and non-null values for both schemaTxnReceipt and resourceTxnReceipt', async () => {
    assert.ok(registeredSchemaDetails?.txnReceipt?.schemaTxnReceipt)
    assert.ok(registeredSchemaDetails?.txnReceipt?.resourceTxnReceipt)

    // Check keys and values for schemaTxnReceipt

    const schemaReceiptKeys = Object.keys(
      registeredSchemaDetails.txnReceipt.schemaTxnReceipt,
    )
    assert.equal(
      arrayHasKeys(schemaReceiptKeys, [
        'txnHash',
        'to',
        'from',
        'nonce',
        'gasLimit',
        'chainId',
      ]),
      true,
    )

    schemaReceiptKeys.forEach((key) => {
      assert.ok(
        registeredSchemaDetails?.txnReceipt?.schemaTxnReceipt[key],
        `${key} should not be empty or null`,
      )
    })

    const resourceReceiptKeys = Object.keys(
      registeredSchemaDetails?.txnReceipt?.resourceTxnReceipt,
    )
    assert.equal(
      arrayHasKeys(resourceReceiptKeys, [
        'txnHash',
        'to',
        'from',
        'nonce',
        'gasLimit',
        'chainId',
      ]),
      true,
    )

    resourceReceiptKeys.forEach((key) => {
      assert.ok(
        registeredSchemaDetails?.txnReceipt?.resourceTxnReceipt[key],
        `${key} should not be empty or null`,
      )
    })
  })

  describe('test getSchemaById function', () => {
    let schemaDetail: any

    before(async () => {
      schemaDetail = await polygonSchemaManager.getSchemaById(
        testDidDetails.did,
        '957e577f-744e-4790-bcf2-b5e4c43aa240',
      )
    })

    it('should have non-empty values for resourceURI and resourceCollectionId', () => {
      assert.ok(schemaDetail)

      assert.ok(schemaDetail.resourceURI)
      assert.notStrictEqual(schemaDetail.resourceURI, '')

      assert.ok(schemaDetail.resourceCollectionId)
      assert.notStrictEqual(schemaDetail.resourceCollectionId, '')

      assert.ok(schemaDetail.resourceId)
      assert.notStrictEqual(schemaDetail.resourceId, '')

      assert.ok(schemaDetail.resourceType)
      assert.strictEqual(schemaDetail.resourceType, 'W3C-schema')
    })
  })
})
