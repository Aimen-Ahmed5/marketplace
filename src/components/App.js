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
   const web3 = window.web3
   //load accounts
   const accounts = await web3.eth.getAccounts()
   // console.log(accounts) 
   this.setState({account: accounts[0]})
   const networkId = await web3.eth.net.getId()
   //console.log(networkId) 
   const networkData = Marketplace.networks[networkId]  //networkId = 5777 or 1337 
   if (networkData){
    const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)  //contract loaded from blockchain
   // console.log(marketplace)
   this.setState({marketplace})
   this.setState({loading: false})
   } else {
    window.alert('Marketplace contract not deployed to detect network')
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
              : <Main />
               }    
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
