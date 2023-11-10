
import React, {Component} from 'react'
import Navbar from './Navbar';
import './App.css'
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'

class App extends Component{
  async componentWillMount(){
    //always take new addresses from metaMASK,recompile sol contracts, add them to truffle abis.
    await this.loadWeb3()
    await this.loadBlockchainData();
  }
  async loadBlockchainData(){

    const web3=await window.web3
    const account= await web3.eth.getAccounts()
    this.setState({account:account[0]})
    const networkId=await web3.eth.net.getId();
    console.log(networkId," NETWORK ID")
    console.log(account," ACCOUNTS")
    const tetherData=Tether.networks[networkId];
    const rwdDAta=RWD.networks[networkId];
    const decentralBank=DecentralBank.networks[networkId];

      
    if (tetherData){
      //take tether contract.
      const tether=new web3.eth.Contract(Tether.abi,tetherData.address);
      this.setState({tether});
      //take balance of bank 
      let tetherBalance=await tether.methods.balance(this.state.account).call();
      this.setState({tetherBalance:tetherBalance.toString()})
      console.log(tetherBalance," BALANCE Tether BANK")
    }else{
      window.alert('Tether contract not deployed')
    }
     
    if (decentralBank){
      //take tether contract.
      const bank=new web3.eth.Contract(DecentralBank.abi,decentralBank.address);
      this.setState({bank});
      //take balance of bank 
      let stakingBalance=await bank.methods.stakingBalance(this.state.account).call();
      this.setState({stakingBalance:stakingBalance})
    }else{
      window.alert('Error!!decentralBank contract not deployed')
    }
    if (rwdDAta){
      //take tether contract.
      const rwd=new web3.eth.Contract(RWD.abi,rwdDAta.address);
      this.setState({rwd});
      //take balance of bank 
      let rwdBalance=await rwd.methods.balance(this.state.account).call();
      this.setState({rwdBalance:rwdBalance})
      console.log(rwdBalance," BALANCE RWD BANK" )
    }else{
      window.alert('RWD contract not deployed')
    }

    this.setState({loading:false})
  }

    async loadWeb3(){
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        try {
          // Request account access
          await window.ethereum.enable();
        } catch (error) {
          // User denied account access...
          console.error("User denied account access")
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = window.web3.currentProvider;
      }
      // If no injected web3 instance is detected, fall back to Ganache
      else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      window.web3 = new Web3(App.web3Provider);
  }
    constructor(props){
        super(props)
        this.state={
            account:'0x0',
            tether:{},
            rwd:{},
            decentralBank:{},
            tetherBalance:'0',
            rwdBalance:'0',
            stakingBalance:'0',
            loading:true
        }
    }
    render(){
        return (
<div>
<Navbar account={this.state.account}/>


</div>
      )  
    }
}
export default App;