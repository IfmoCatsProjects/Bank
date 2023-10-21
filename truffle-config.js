require('babel-register');
require('babel-polyfill');
module.exports={
    migrations_directory: "./migrations/",
    networks:{
        development:{
            host:'127.0.0.1',
            port:'7545',
            network_id:'*'
        },
    },
    contract_directory: './src/contracts/',
    contract_build_directory: './src/truffle_abis/',
    
    compilers:{
        solc:{
            version :'0.5.0',
            optimizer:{
enabled:true,
runs:200
            },
        }
    }
    

}

