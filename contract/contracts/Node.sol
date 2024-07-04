// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Node is ERC721, ERC721Burnable, AccessControl, Ownable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address private _nodeManagerAddress;

    constructor(string memory name, string memory symbol, address nodeManagerAddress)
        ERC721(name, symbol)
        Ownable(msg.sender)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _nodeManagerAddress = nodeManagerAddress;
    }

    modifier onlyNodeManager() {
        require(_nodeManagerAddress == msg.sender, "Unauthorized: Only node manager");
        _;
    }

    function setNodeManagerAddress(address newAddress) public onlyOwner {
        _nodeManagerAddress = newAddress;
    }

    function getNodeManagerAddress() public view returns (address) {
        return _nodeManagerAddress;
    }

    function safeMint(address to, uint256 tokenId) public onlyNodeManager {
        _safeMint(to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
