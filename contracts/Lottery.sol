pragma solidity ^0.4.25;

contract Lottery {
    address public manager;
    address[] public players;
    constructor () public {
        manager = msg.sender;
    }
    function enter() public payable {
        require (
            msg.value > .01 ether,
            'Insufficient ether paid'
        );
        players.push(msg.sender);
    }
    function randomNumber() private view returns (uint) {
        // Instance of SHA-3 passing variables to randomize
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    function pickWinner() public restrictedToManager {
        uint index = randomNumber() % players.length;
        // Send total lottery pool to address
        players[index].transfer(address(this).balance);
        // Reset lottery
        players = new address[](0);
    }
    // Show array of all players in lottery
    function getPlayers() public view returns(address[]) {
        return players;
    }
    modifier restrictedToManager() {
        require (
            msg.sender == manager,
            'Sender not authorized'
        );
        _;
    }
}