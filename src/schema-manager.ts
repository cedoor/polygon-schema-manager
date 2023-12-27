import { Contract, JsonRpcProvider, Wallet } from 'ethers'
import { parseDid, validateDid } from './utils/did'
import { v4 as uuidv4 } from 'uuid'
import { abi } from '../tests/fixtures/test.data'
import schemaAbi from '../tests/fixtures/SchemaRegistry.json'
import axios from 'axios'

export type PolygonDidInitOptions = {
  contractAddress: string
  rpcUrl: string
  privateKey: string
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
    contractAddress,
    schemaManagerContractAddress,
    rpcUrl,
    serverUrl,
    fileServerToken,
    privateKey,
  }: PolygonDidInitOptions) {
    const provider = new JsonRpcProvider(rpcUrl)
    const wallet = new Wallet(privateKey, provider)
    this.didRegistry = new Contract(
      contractAddress,
      abi, //test ABI
      wallet,
    )
    this.accessToken = fileServerToken
    this.fileServerUrl = serverUrl
    this.schemaRegistry = new Contract(
      schemaManagerContractAddress,
      schemaAbi, //schemaAbi ABI
      wallet,
    )
  }

  public async createSchema(did: string, schemaJson: any) {
    let addedResourcetxnReceipt
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

      const schemaId = uuidv4()
      const schemaTxnReceipt = await this.schemaRegistry.createSchema(
        parsedDid.didAddress,
        schemaId,
        schemaJson,
      )
      if (schemaTxnReceipt) {
        const resourceId = uuidv4()
        addedResourcetxnReceipt = await this.didRegistry.addResources(
          parsedDid.didAddress,
          resourceId,
          schemaJson,
        )
        console.log('addedResourcetxnReceipt::::', addedResourcetxnReceipt)
        if (addedResourcetxnReceipt) {
          const schemaPayload = {
            schemaId: `${schemaId}`,
            schema: schemaJson,
          }

          // Axios options for the POST request
          const axiosOptions = {
            method: 'post',
            url: this.fileServerUrl,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.accessToken}`,
            },
            data: JSON.stringify(schemaPayload),
          }
          try {
            const response = await axios(axiosOptions)
            console.log('res', response.data)
          } catch (error: any) {
            console.error('Error:', error.response.data as Error)
          }
        }
      }

      return {
        did,
        schemaId,
        schemaTxnReceipt,
      }
    } catch (error) {
      console.log(`Error occurred in createSchema function ${error} `)
      throw error
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
      const schemaDetails = await this.didRegistry.getSchemaById(
        parsedDid.didAddress,
        schemaId,
      )

      return {
        schemaDetails,
      }
    } catch (error) {
      console.log(`Error occurred in createSchema function ${error} `)
      throw error
    }
  }
}
