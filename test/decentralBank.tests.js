

const Tether=artifacts.require ('Tether');
const RWD=artifacts.require ('RWD');
const DecentralBank=artifacts.require ('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()
//simple example check names 
contract('DecentralBank',([owner,customer])=>{
  function tokens(number){
    return web3.utils.toWei(number,'ether');
  }
  
    let  tether,rwd,decentralBank;
//load contracts.
    before(async()=>{
      tether=await Tether.new();
      rwd=await RWD.new();
      decentralBank=await DecentralBank.new(rwd.address,tether.address);
      //Transfer all tokens to bank 1 million tokens
await rwd.transfer(decentralBank.address,tokens('1000000'));
//Transfer 100 mock to customer
await tether.transfer(customer,tokens('100'),{from:owner});

})

describe('Mock Tether Deployment',async()=>{
    it('matches name successfully',async()=>{
     let name=await tether.name();
     assert.equal(name,'Mock Tether Token')
    })
})
describe('Reward Token',async()=>{
    it('matches name successfully',async()=>{
     let name=await rwd.name();
     assert.equal(name,'Reward Token')
    })
})
describe('Decentral Bank',async()=>{
    it('matches name successfully',async()=>{
     let name=await decentralBank.name();
     assert.equal(name,'Decentral Bank')
    })
})


describe('Check Bank tokens amount  ',async()=>{
    it('Bank has neccessary amount',async()=>{
     let balance=await rwd.balance(decentralBank.address);
     assert.equal(balance.toString(),tokens('1000000'));
    })
})


describe('Check Investor tokens amount ',async()=>{
    it('Investor has neccessary amount',async()=>{
    
        //Check ivestor balance
    let balance=await tether.balance(customer);
     assert.equal(balance,tokens('100')); 

    })
    
})





});
