// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract TrackzEssai is ERC1155 {
  constructor() public ERC1155("https://trackz.vercel.app/api/trackzs/{id}") {}
}
