
import React, {Component} from 'react'
import Navbar from './Navbar';
import './App.css'
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json'
class App extends Component{
  async componentWillMount(){
    //always take new addresses from metaMASK.
    await this.loadWeb3()
    await this.loadBlockchainData();
  }
  async loadBlockchainData(){

    const web3=window.web3
    const account= await web3.eth.getAccounts()
    this.setState({account:account[0]})
    const networkId=await web3.eth.net.getId();
    console.log(networkId," NETWORK ID")
    console.log(account)
    const tetherData=Tether.networks[networkId];
    if (tetherData){
      //take tether contract.
      const tether=new web3.eth.Contract(Tether.abi,tetherData.address);
      this.setState({tether});
      //take balance of bank 
      let tetherBalance=await tether.methods.balance(this.state.account).call();
      this.setState({tetherBalance:tetherBalance.toString()})
      console.log(tetherBalance," BALANCE BANK")
    }else{
      window.alert('Error!!Tether contract not deployed -no  detected network')
    }
  }

    async loadWeb3(){
    if (window.ethereuem){
        window.web3=new Web3(window.ethereuem);
        await window.ethereuem.enable()
    }else{
        if (window.web3){
            window.web3=new Web3(window.web3.currentProvider);
        }else{window.alert('No ethreuem window detected!Check MetaMask')}
    }
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