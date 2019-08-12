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