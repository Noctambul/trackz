// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TrackzEssai is ERC1155, Ownable {
  constructor() ERC1155("https://trackz.vercel.app/api/trackzs/{id}") {}

  function uri(uint256 id) public view override returns (string memory) {
    return string.concat("https://trackz.vercel.app/api/trackzs/", Strings.toString(id));
  }
}
