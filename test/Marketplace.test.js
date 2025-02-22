const { assert, should } = require('chai')

const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
.use(require('chai-as-promised'))
.should()


contract('Marketplace', ([deployer, seller, buyer]) =>{

let marketplace

// first deploy marketplace on blockchain to use it to get components of the contract like address, name
before(async () => {
  marketplace = await Marketplace.deployed()
})

//if deployment is done successfully fetch address of marketplace (smart contract)
describe('deployment', async () => {
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
 
// create product on blockchain  
describe('product', async () => {
  let result, productCount

  before(async () => {
  
    // instead to writing whole wei value use web3 converter 
    // msg.sender is seller (2nd account)
    result = await marketplace.createProduct('Hand Bag', web3.utils.toWei('1', 'Ether'), { from: seller })
    productCount = await marketplace.productCount()
  })
  //check id product created/added, then increment the productCount
it('product created', async () => {
  //SUCCESS
  assert.equal(productCount, 1)
 //  console.log(result.logs);
 const event = result.logs[0].args
 assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
 assert.equal(event.name, 'Hand Bag', 'product name is correct')
 assert.equal(event.price, '1000000000000000000', 'price is correct')
 assert.equal(event.owner, seller , 'owner is correct')
 assert.equal(event.purchased, false, 'purchased status is correct')

 //FAILURE

 //reject if no name
await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected

//reject if no price
await marketplace.createProduct('Hand Bag', 0, { from: seller }).should.be.rejected
})

it('list product', async () => {
const product = await marketplace.products(productCount)
assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
assert.equal(product.name, 'Hand Bag', 'product name is correct')
assert.equal(product.price, '1000000000000000000', 'price is correct')
assert.equal(product.owner, seller , 'owner is correct')
assert.equal(product.purchased, false, 'purchased status is correct')
})

//here buyer will pay
it('sells product', async () => {

  //track sellers balance before purchase
  let sellerOldBalance 
  sellerOldBalance = await web3.eth.getBalance(seller)  //get balance of seller's account
  sellerOldBalance = new web3.utils.BN(sellerOldBalance)

  //SUCCESS buyer makes purchase
  result = await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') })

  //check logs
  const event = result.logs[0].args
 assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
 assert.equal(event.name, 'Hand Bag', 'product name is correct')
 assert.equal(event.price, '1000000000000000000', 'price is correct')
 assert.equal(event.owner, buyer, 'owner is correct')
 assert.equal(event.purchased, true, 'purchased status is correct')

 //check seller receives funds 
 let sellerNewBalance
 sellerNewBalance = await web3.eth.getBalance(seller) 
 sellerNewBalance = new web3.utils.BN(sellerNewBalance)

 let price 
 price = web3.utils.toWei('1', 'Ether')
 price = new web3.utils.BN(price)  // convert price tp Bit Number BN (use new)

const expectedBalance = sellerOldBalance.add(price)
assert.equal(sellerNewBalance.toString(), expectedBalance.toString())

//Failure
// if product does not have valid id
await marketplace.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected

// not enough ether to buy the product
await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected

// product can not be purchased twice
await marketplace.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected

  })

})



})

})