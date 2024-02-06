import {
  testDidDetails,
  testContractDetails,
  fileServerUrl,
  fileServerAccessToken,
  testSchemaId,
  testSchemaSample,
} from './fixtures/test.data'
import { describe, it, before } from 'node:test'
import assert from 'node:assert'
import { arrayHasKeys } from './utils/array'
import { PolygonSchema } from '../src/schema-manager'
import { SigningKey } from 'ethers'

const NETWORK_URL = testContractDetails.networkUrl
const DID_REGISTRAR_CONTRACT_ADDRESS = testContractDetails.contractAddress
const SCHEMA_MANAGER_CONTRACT_ADDRESS =
  testContractDetails.schemaManagerContract

describe('Schema Manager', () => {
  let polygonSchemaManager: PolygonSchema
  let polygonDID: string

  before(async () => {
    polygonDID = testDidDetails.did
    polygonSchemaManager = new PolygonSchema({
      didRegistrarContractAddress: DID_REGISTRAR_CONTRACT_ADDRESS,
      schemaManagerContractAddress: SCHEMA_MANAGER_CONTRACT_ADDRESS,
      rpcUrl: NETWORK_URL,
      signingKey: new SigningKey(`0x${testDidDetails.privateKey}`),
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
      testSchemaSample,
    )
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
        testSchemaId,
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

  describe('test estimate transaction', () => {
    let transactionDetails: any

    before(async () => {
      transactionDetails = await polygonSchemaManager.estimateTxFee(
        'createSchema',
        [
          '0x13cd23928Ae515b86592C630f56C138aE4c7B79a',
          '68768734687ytruwytuqyetrywqt',
          'ertyuioiuytyuiuyt',
        ],
      )
    })

    it('should have non-empty values for transaction details', () => {
      assert.ok(transactionDetails)

      assert.ok(transactionDetails.transactionFee)
      assert.notStrictEqual(
        transactionDetails.transactionFee,
        '' || null || undefined,
      )

      assert.ok(transactionDetails.gasLimit)
      assert.notStrictEqual(
        transactionDetails.gasLimit,
        '' || null || undefined,
      )

      assert.ok(transactionDetails.gasPrice)
      assert.notStrictEqual(
        transactionDetails.gasPrice,
        '' || null || undefined,
      )

      assert.ok(transactionDetails.network)
      assert.notStrictEqual(transactionDetails.network, '' || null || undefined)

      assert.ok(transactionDetails.chainId)
      assert.notStrictEqual(transactionDetails.chainId, '' || null || undefined)

      assert.ok(transactionDetails.method)
      assert.notStrictEqual(transactionDetails.method, '' || null || undefined)
    })
  })

  describe('test schema validator', () => {
    let isValidatedSchema: any

    before(async () => {
      isValidatedSchema =
        await polygonSchemaManager.validateSchemaObject(testSchemaSample)
    })
    it('should have validate the schema JSON', () => {
      assert.ok(isValidatedSchema)

      assert.ok(isValidatedSchema)
      assert.strictEqual(isValidatedSchema, true)
    })
  })
})
