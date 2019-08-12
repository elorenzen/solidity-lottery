const path = require('path'),
      solc = require('solc'),
        fs = require('fs');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');


module.exports = solc.compile(source, 1).contracts[':Lottery'];
