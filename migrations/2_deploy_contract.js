const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')

const PolygonSchemaRegistry = artifacts.require('SchemaRegistry')

module.exports = async function (deployer) {
  const instance = await deployProxy(PolygonSchemaRegistry, { deployer })
  // const instance = await upgradeProxy('0x426196d9E365e64Fa41CB2436ee9B371169162Ba', PolygonDidRegistry, { deployer });
  console.log('Deployed', instance.address)
}
