const Marketplace = artifacts.require('./Marketplace.sol')

contract('Marketplace', (accounts) =>{

let marketplace


// first deploy marketplace on blockchain to use it to get components of the contract like address, name
before(async () => {
  marketplace = await Marketplace.deployed()
})

//if deployment is done successfully fetch address of marketplace (smart contract)
describe('deployment', async () =>{
  it('deployed successfully', async () => {
    const address = await marketplace.address 
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })
})

})