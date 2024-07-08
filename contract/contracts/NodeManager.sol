// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "./Node.sol"; // Ensure the correct path to the Node.sol file
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NodeManager is Pausable, AccessControl, Ownable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    Node public nodeContract;

    struct NodeTier {
        bool status;
        string name;
        string metadata;
        uint256 price;
    }

    uint256 public nodeId;
    mapping(uint256 => NodeTier) public nodeTiers;

    struct Referral {
        address referrer;
        uint256 amount;
    }

    mapping(address => string) public userReferralCodes;
    mapping(string => address) public referralOwners;
    mapping(string => bool) usedReferralCodes;

    // Events
    event NodeAdded(
        address indexed user,
        uint256 nodeId,
        bool status,
        string name,
        string metadata,
        uint256 price
    );
    event NodeUpdated(
        address indexed user,
        uint256 nodeId,
        bool status,
        string name,
        string metadata,
        uint256 price
    );
    event NodeDeleted(address indexed user, uint256 nodeId);

    event FundsWithdrawn(address indexed to, uint256 value);

event Buy(uint256 indexed nodeId, address indexed buyer, string referralCode, uint256 referralAmount);


    // Constructor
    constructor(address _nodeContract) Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        nodeContract = Node(_nodeContract);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getNodeContract() public view returns (address) {
        return address(nodeContract);
    }

    function setNodeContract(address _nodeContract) public onlyRole(DEFAULT_ADMIN_ROLE) {
        nodeContract = Node(_nodeContract);
    }

    // NODE Tier MANAGEMENT
    function addNodeTier(
        string memory name,
        string memory metadata,
        uint256 price
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(price > 0, "Price must be greater than 0");
        nodeId++;
        NodeTier memory newNode = NodeTier(false, name, metadata, price);
        nodeTiers[nodeId] = newNode;
        emit NodeAdded(
            msg.sender,
            nodeId,
            nodeTiers[nodeId].status,
            name,
            metadata,
            price
        );
    }

    function getNodeTierDetails(
        uint256 _nodeId
    ) public view returns (NodeTier memory) {
        return nodeTiers[_nodeId];
    }

    function updateNodeTier(
        uint256 _nodeId,
        string memory newName,
        string memory newMetadata,
        bool newStatus,
        uint256 newPrice
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(nodeTiers[_nodeId].price > 0, "Node does not exist");
        require(newPrice > 0, "Price must be greater than 0");
         NodeTier memory updatedNode = NodeTier(newStatus, newName, newMetadata, newPrice);
        
        nodeTiers[_nodeId] = updatedNode;

        emit NodeUpdated(
            msg.sender,
            _nodeId,
            updatedNode.status,
            updatedNode.name,
            updatedNode.metadata,
            updatedNode.price
        );
    }

    // Referral management
    function generateReferralCode(address user) public returns (string memory) {
        require(bytes(userReferralCodes[user]).length == 0, "Referral code already generated for this user");

        string memory newReferralCode = string(abi.encodePacked("BachiSwap_", toAsciiString(user), "_", uint2str(block.timestamp)));
        userReferralCodes[user] = newReferralCode;
        referralOwners[newReferralCode] = user;

        return newReferralCode;
    }

    function getReferralCode(address user) public view returns (string memory) {
        return userReferralCodes[user];
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2 ** (8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    // event Buy(uint256 indexed nodeId, address indexed buyer, string referralCode, uint256 referralAmount);


function buyNode(uint256 _nodeId, string memory referralCode) public payable whenNotPaused {
    require(nodeTiers[_nodeId].price > 0, "Node does not exist");
    require(msg.value >= nodeTiers[_nodeId].price, "Insufficient funds");

    uint256 referralFee = 0;
    if (bytes(referralCode).length > 0) {
        address referrer = referralOwners[referralCode];
        require(referrer != address(0), "Invalid referral code");
        require(!usedReferralCodes[referralCode], "Referral code already used");
        
        referralFee = msg.value / 10; 
        (bool sent, ) = referrer.call{value: referralFee}("");
        require(sent, "Failed to send referral fee");

        usedReferralCodes[referralCode] = true; // Mark referral code as used

        // Emit the referral amount event
        emit Buy(_nodeId, msg.sender, referralCode, referralFee);
    }

    if (bytes(userReferralCodes[msg.sender]).length == 0) {
        string memory newReferralCode = generateReferralCode(msg.sender);
        referralOwners[newReferralCode] = msg.sender;
    }

    nodeContract.safeMint(msg.sender, _nodeId);
}




    function buyAdmin(
        uint256 _nodeId,
        address nodeOwner
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(nodeTiers[_nodeId].price > 0, "Node does not exist");
        nodeContract.safeMint(nodeOwner, _nodeId);
        if (bytes(userReferralCodes[nodeOwner]).length == 0) {
            string memory newReferralCode = generateReferralCode(nodeOwner);
            referralOwners[newReferralCode] = nodeOwner;
        }
        // emit Buy(_nodeId, nodeOwner, userReferralCodes[nodeOwner]);
    }

    function withdraw(address payable to, uint256 value) public onlyOwner {
        require(
            address(this).balance >= value,
            "Insufficient contract balance"
        );

        (bool sent, ) = to.call{value: value}("");
        require(sent, "Failed to send Ether");

        emit FundsWithdrawn(to, value);
    }

    // Fallback function to receive Ether
    receive() external payable {}
}
