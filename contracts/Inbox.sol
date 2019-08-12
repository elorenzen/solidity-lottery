pragma solidity ^0.4.25;

// contract === class in JS
contract Inbox {
    // Signifies instance of public variable 'message' of type string
    string public message;
    constructor (string memory initialMessage) public {
        message = initialMessage;
    }
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    function doMath(int a, int b) public pure {
        a + b;
        a - b;
        a * b;
        a == 0;
    }
}