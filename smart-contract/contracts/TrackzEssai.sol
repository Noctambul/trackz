// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// @author: @noctambul
contract TrackzEssai is ERC1155, Ownable {
    using Counters for Counters.Counter;

    event TrackzCreated(
        uint256 token,
        uint256 amount,
        string name,
        address creator
    );

    Counters.Counter _tokenIds;
    mapping(uint256 => address) public creators;

    constructor() ERC1155("https://trackz.vercel.app/api/trackzs/{id}") {}

    // string calldata _name,
    // string calldata _uri,
    // bytes calldata _data
    function create(string calldata _name, uint256 _initialSupply)
        external
        payable
        returns (uint256)
    {
        require(_initialSupply > 0, "Cannot mint 0 pieces !");
        require(bytes(_name).length > 0, "Please give a name to your Trackz");
        // require(msg.value >= 1_000_000_000_000_000_000, "Insufficient Balance");

        // treasurer.call.value(msg.value)("");
        uint256 _id = _tokenIds.current();
        _tokenIds.increment();
        creators[_id] = msg.sender;

        _mint(msg.sender, _id, _initialSupply, "");

        emit TrackzCreated(_id, _initialSupply, _name, msg.sender);
        return _id;
    }
}
