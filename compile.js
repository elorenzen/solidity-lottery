const path = require('path'),
      solc = require('solc'),
        fs = require('fs');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');


module.exports = solc.compile(source, 1).contracts[':Inbox'];
