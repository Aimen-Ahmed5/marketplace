import React, { Component } from 'react';
import Web3 from 'web3';
// import logo from '../logo.png';
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main';

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
      // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum); // new connection will be instantiated
              // Request account access if needed
              await window.ethereum.enable();
          }   // Legacy dapp browsers...
          else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider); // new connection will be instantiated
      }
      // Non-dapp browsers...
      else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
  }

  async loadBlockchainData (){
    // get network provider
   const web3 = window.web3
   // use web3 to load user accounts
   const accounts = await web3.eth.getAccounts()

   // window.ethereum
   // const accounts = await ethereum.request({ method: 'eth_accounts' }); 

   // console.log(accounts)

   this.setState({account: accounts[0]})
   const networkId = await web3.eth.net.getId()
   //console.log(networkId) 
   const networkData = Marketplace.networks[networkId]  //networkId = 5777 or 1337 
   if (networkData){
    const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)  //contract loaded from blockchain
    // console.log(marketplace)
    this.setState({marketplace})
    const productCount = await marketplace.methods.productCount().call()  // call() and .send in web3 sends data
    this.setState({productCount})
    // console.log(productCount.toString())

    //load products
    for(var i =1; i <= productCount; i++){
      const product = await marketplace.methods.products(i).call() //read the mapping 
      this.setState({
        peoducts: [...this.state.product, product] // through spread op take existing products and add new to it
      })
    }
    this.setState({loading: false})
    console.log(this.state.products)
  } else {
    window.alert('Marketplace contract not deployed to detected network')
   }
  }
  constructor(props){
    super (props)
    this.state = { 
      // default values 
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
  }

  createProduct(name, price){
    this.setState({loading: true})
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account})  //promise used
    .once('receipt', receipt => {
      this.setState({loading: false})
    })
    // to tell react that createProduct in main and function are same
    this.createProduct = this.createProduct.bind(this) 
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {
              this.state.loading ? 
              <div id="loader" className="text-center"><h3 className="text-center"> Loading...</h3></div> 
              : <Main createProduct = {this.createProduct} />
               }    
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
