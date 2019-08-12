const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile')

const provider = ganache.provider();
/* 
web3 === Instance of Web3 that requests
connection to local network
*/
const web3 = new Web3(provider)

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there!';
const NEW_MESSAGE = 'See ya later';

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await 
        // Tells web3 about methods the Inbox contract has
        new web3.eth.Contract(JSON.parse(interface))
            // Request to deploy copy of this contract
            .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
            // Initiate transaction that creates this contract
            .send({ from: accounts[0], gas: '1000000' })
    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('Deploys a contract', () => {
        // Checks deployment through instance of address
        assert.ok(inbox.options.address);
    });

    it('Contract has a default message', async () => {
        /*
            inbox.methods.message() ===
            inbox content's method object
            containing functions in .sol file 
        */
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('Message can be changed', async () => {
        await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, NEW_MESSAGE);
    });
})