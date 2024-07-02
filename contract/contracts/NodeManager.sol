// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NodeManager is Pausable, AccessControl, Ownable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor() Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    struct NodeInformation {
        bool status;
        string name;
        string metadata;
    }


    struct DiscountCoupon {
        bool status;
        uint256 discountPercent;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setAdmin(address newAdmin) public onlyOwner {
        grantRole(DEFAULT_ADMIN_ROLE, newAdmin);
    }

    function checkAdmin(address admin) public view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, admin);
    }

    mapping(uint64 => NodeInformation) public nodeInformations;
    mapping(uint64 => DiscountCoupon) public discountCoupons;
    uint64 public nodeId;
    uint64 public couponId;

    function addNodeInfor( string memory name, string memory metadata) public returns (uint64) {
        nodeId++;
        nodeInformations[nodeId] = NodeInformation(false, name, metadata);
        return nodeId;
    }
    

 function getNodeInformation(uint64 id) public view returns (bool status, string memory name, string memory metadata) {
   
    return (nodeInformations[id].status, nodeInformations[id].name, nodeInformations[id].metadata);
  }

function updateNodeInformation(uint64 id, string memory newName, string memory newMetadata, bool newStatus) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");

    nodeInformations[id].name = newName;
    nodeInformations[id].metadata = newMetadata;
    nodeInformations[id].status = newStatus;
}

function deleteNodeInformation(uint64 id) public {
    require(nodeInformations[id].status, "Node does not exist");
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");

    delete nodeInformations[id];
}

/////////////////////////////////////////////////////////////////////////////////////////

function addDiscountCoupon(uint256 discountPercent) public returns (uint64) {
        couponId++;
        discountCoupons[couponId] = DiscountCoupon(false, discountPercent);
        return couponId;
    }

    function getDiscountCoupon(uint64 id) public view returns (bool status, uint256 discountPercent) {
        return (discountCoupons[id].status, discountCoupons[id].discountPercent);
    }

    function updateDiscountCoupon(uint64 id, uint256 newDiscountPercent, bool newStatus) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
    discountCoupons[id].discountPercent = newDiscountPercent;
    discountCoupons[id].status = newStatus;
}


    function deleteDiscountCoupon(uint64 id) public {
        require(discountCoupons[id].status, "Coupon does not exist");
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");

        delete discountCoupons[id];
    }
}


