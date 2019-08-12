const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile')

const provider = ganache.provider();
/* 
web3 === Instance of Web3 that requests
connection to local network
*/
const web3 = new Web3(provider);

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000'});
});

describe('Lottery function', () => {
    it('Contract successfully deployed', () => {
        assert.ok(lottery.options.address);
    });

    it('One account allowed to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            // call web3 method that converts ether to Wei
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
    
        assert.equal(accounts[0], players[0])
        assert.equal(1, players.length);
    });

    it('Multiple accounts allowed to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            // call web3 method that converts ether to Wei
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            // call web3 method that converts ether to Wei
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            // call web3 method that converts ether to Wei
            value: web3.utils.toWei('0.02', 'ether')
        });


        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
    
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2])
        assert.equal(3, players.length);
    });

    it('Minimum ether requirement catch', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            })

            // Makes sure that try fails
            assert(false)
        } catch (err) {
            assert(err);
        }
    });

    it('Only manager can pick lottery winner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1],
            });
            assert(false)
        } catch (err) {
            assert(err);
        }
    });

    it('Money sent to winner and lottery reset', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({ from: accounts[0] });

        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance - initialBalance;
        assert(difference > web3.utils.toWei('1.8', 'ether'));
    });
});