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

  // if name is correct
  it('has valid name', async () => {
    const name = await marketplace.name()
    assert.equal(name, 'Gem Store')
  })

let result, productCount
 
// create product on blockchain  
describe('product', async () => {
  result = await marketplace.createProduct()
})

//check id product created/added, then increment the productCount
it('product created', async () => {
  //success
  assert.equal(productCount, 1)
})

})

})