
import React, {Component} from 'react'
import Navbar from './Navbar';
import './App.css'
import Web3 from 'web3';
class App extends Component{
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData();
  }
  async loadBlockchainData(){

    const web3=window.web3
    const account= await web3.eth.getAccounts()
    console.log(account)
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
            account:'0x0'
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