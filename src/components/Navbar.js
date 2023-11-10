
import React, {Component} from 'react'
import bank from '../bank.png'

class Navbar extends Component{
    render(){
        return (
<nav className='navbar navbar-dark fixed-top shadow p-0' style={{background:'black',height:'50px'}}>
<a className='navbar-brand col-sm-2 col-md-3 mr-0' style={{color:'yellow'}}>DECENTRALIZED BANK &nbsp;&nbsp; 
<img src={bank} width='50' height='30' className='d-inline-block align-top' alt='Bank'/>
</a>
<ui className='navbar-nav px-3'>
<li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
<small style={{color:'white'}}>ACCOUNT NUMBERS:{this.props.account}</small>
</li>
</ui>
</nav>
      )  
    }
}
export default Navbar;