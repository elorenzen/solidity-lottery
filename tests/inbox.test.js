const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile')

/* 
web3 === Instance of Web3 that requests
connection to local network
*/
const web3 = new Web3(ganache.provider())

let accounts;
beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    
})

describe('Inbox', () => {
    it('Deploys a contract', () => {
        console.log(accounts);
    })
})