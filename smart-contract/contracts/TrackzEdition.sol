// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC1155Base.sol";

contract TrackzEdition is ERC1155Base {
    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    ) ERC1155Base(_name, _symbol, _royaltyRecipient, _royaltyBps) {}

    function _canMint() internal pure override returns (bool) {
        return true;
    }

    function mintTo(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI,
        uint256 _amount
    ) public override {
        super.mintTo(_to, _tokenId, _tokenURI, _amount);
    }
}
