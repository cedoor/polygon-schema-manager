import { Contract, JsonRpcProvider, SigningKey, Wallet } from 'ethers'
import { parseDid, validateDid } from './utils/did'
import { v4 as uuidv4 } from 'uuid'
import SchemaRegistryAbi from './abi/SchemaRegistry.json'
import { buildSchemaResource } from './utils/schemaHelper'
import DidRegistryContract from '@ayanworks/polygon-did-registry-contract'
import axios from 'axios'

export type PolygonDidInitOptions = {
  didRegistrarContractAddress: string
  rpcUrl: string
  signingKey: SigningKey
  schemaManagerContractAddress: string
  serverUrl: string
  fileServerToken: string
}

export type PolygonDidRegisterOptions = {
  did: string
  publicKeyBase58: string
  serviceEndpoint?: string
}

export type ResourcePayload = {
  resourceURI: string
  resourceCollectionId: string
  resourceId: string
  resourceName: string
  resourceType: string
  mediaType: string
  created: string
  checksum: string
  previousVersionId: string | null
  nextVersionId: string | null
}

export class PolygonSchema {
  private didRegistry: Contract
  private schemaRegistry: Contract
  private fileServerUrl: string
  private accessToken: string

  public constructor({
    didRegistrarContractAddress,
    schemaManagerContractAddress,
    rpcUrl,
    serverUrl,
    fileServerToken,
    signingKey,
  }: PolygonDidInitOptions) {
    const provider = new JsonRpcProvider(rpcUrl)
    const wallet = new Wallet(signingKey, provider)
    this.didRegistry = new Contract(
      didRegistrarContractAddress,
      DidRegistryContract.abi,
      wallet,
    )
    this.accessToken = fileServerToken
    this.fileServerUrl = serverUrl
    this.schemaRegistry = new Contract(
      schemaManagerContractAddress,
      SchemaRegistryAbi,
      wallet,
    )
  }

  public async createSchema(did: string, schemaName: string, schema: object) {
    let schemaId
    let tnxSchemaId = ''
    let tnxSchemaTxnReceipt: {
      txnHash: string
      to: string
      from: string
      nonce: string
      gasLimit: string
      chainId: string
    }

    if (!this.accessToken) {
      throw new Error(`Invalid token!`)
    }

    try {
      const isValidDid = validateDid(did)
      if (!isValidDid) {
        throw new Error('Invalid did provided')
      }
      const parsedDid = parseDid(did)

      const didDocument = await this.didRegistry.getDIDDoc(parsedDid.didAddress)
      if (!didDocument[0]) {
        throw new Error(`The DID document for the given DID was not found!`)
      }
      schemaId = uuidv4()
      const schemaResource: ResourcePayload = await buildSchemaResource(
        did,
        schemaId,
        schemaName,
      )

      const schemaTxnReceipt = await this.schemaRegistry.createSchema(
        parsedDid.didAddress,
        schemaId,
        JSON.stringify(schemaResource),
      )

      if (!schemaTxnReceipt.hash) {
        throw new Error(`Error while adding schema in Registry!`)
      }

      const uploadSchemaDetails = await this.uploadSchemaFile(schemaId, schema)

      if (!uploadSchemaDetails) {
        throw new Error(`Error while uploading schema on file server!`)
      }

      const addedResourcetxnReceipt = await this.didRegistry.addResource(
        parsedDid.didAddress,
        schemaId,
        JSON.stringify(schemaResource),
      )

      if (!addedResourcetxnReceipt.hash) {
        tnxSchemaId = schemaId
        tnxSchemaTxnReceipt = {
          txnHash: schemaTxnReceipt.hash,
          to: schemaTxnReceipt.to,
          from: schemaTxnReceipt.from,
          nonce: schemaTxnReceipt.nonce,
          gasLimit: schemaTxnReceipt.nonce,
          chainId: schemaTxnReceipt.chainId,
        }
        throw new Error(`Error while adding schema resource in DID Registry!`)
      }

      return {
        did,
        schemaId,
        txnReceipt: {
          schemaTxnReceipt: {
            txnHash: schemaTxnReceipt.hash,
            to: schemaTxnReceipt.to,
            from: schemaTxnReceipt.from,
            nonce: schemaTxnReceipt.nonce,
            gasLimit: schemaTxnReceipt.nonce,
            chainId: schemaTxnReceipt.chainId,
          },
          resourceTxnReceipt: {
            txnHash: addedResourcetxnReceipt.hash,
            to: addedResourcetxnReceipt.to,
            from: addedResourcetxnReceipt.from,
            nonce: addedResourcetxnReceipt.nonce,
            gasLimit: addedResourcetxnReceipt.nonce,
            chainId: addedResourcetxnReceipt.chainId,
          },
        },
      }
    } catch (error) {
      console.log(`Error occurred in createSchema function ${error} `)
      return {
        tnxSchemaId,
        schemaState: {
          state: 'failed',
          reason: `unknownError: ${error}`,
        },
      }
    }
  }

  public async getSchemaById(did: string, schemaId: string) {
    try {
      const isValidDid = validateDid(did)
      if (!isValidDid) {
        throw new Error('invalid did provided')
      }

      const parsedDid = parseDid(did)

      const didDocument = await this.didRegistry.getDIDDoc(parsedDid.didAddress)
      if (!didDocument[0]) {
        throw new Error(`The DID document for the given DID was not found!`)
      }
      const schemaDetails = await this.schemaRegistry.getSchemaById(
        parsedDid.didAddress,
        schemaId,
      )

      return JSON.parse(schemaDetails)
    } catch (error) {
      console.log(`Error occurred in createSchema function ${error} `)
      throw error
    }
  }

  private async uploadSchemaFile(schemaResourceId: string, schema: object) {
    try {
      const schemaPayload = {
        schemaId: `${schemaResourceId}`,
        schema,
      }

      const axiosOptions = {
        method: 'post',
        url: `${this.fileServerUrl}/schemas`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
        data: JSON.stringify(schemaPayload),
      }

      const response = await axios(axiosOptions)
      return response
    } catch (error) {
      console.log(`Error occurred in uploadSchemaFile function ${error} `)
      throw error
    }
  }
}
