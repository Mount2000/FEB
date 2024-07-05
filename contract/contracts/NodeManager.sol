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

    struct DiscountCoupon {
        bool status;
        uint8 discountPercent;
    }

    uint256 public couponId;
    mapping(uint256 => DiscountCoupon) public discountCoupons;

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

    event CouponAdded(
        address indexed user,
        uint256 couponId,
        bool status,
        uint8 discountPercent
    );
    event CouponUpdated(
        address indexed user,
        uint256 couponId,
        bool status,
        uint8 discountPercent
    );
    event CouponDeleted(address indexed user, uint256 couponId);

    event FundsWithdrawn(address indexed to, uint256 value);

    event Buy(uint256 indexed nodeId, address indexed nodeOwner);

    //CONTRUCTOR
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
        
        // Cập nhật nodeTiers với biến mới
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

    // COUPON MANAGEMENT

    function addDiscountCoupon(
        uint8 discountPercent
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(discountPercent > 0, "Discount percent must be greater than 0");
        couponId++;
        DiscountCoupon memory newCoupon = DiscountCoupon(false, discountPercent);
        discountCoupons[couponId] = newCoupon;
        
        emit CouponAdded(
            msg.sender,
            couponId,
            newCoupon.status,
            newCoupon.discountPercent
        );
    }

    function getDiscountCoupon(
        uint256 _couponId
    ) public view returns (DiscountCoupon memory) {
        return discountCoupons[_couponId];
    }

    function updateDiscountCoupon(
        uint256 _couponId,
        uint8 newDiscountPercent,
        bool newStatus
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(
            discountCoupons[_couponId].discountPercent > 0,
            "Coupon does not exist"
        );
        DiscountCoupon memory updatedCoupon = DiscountCoupon(newStatus, newDiscountPercent);
        discountCoupons[_couponId] = updatedCoupon;
        emit CouponUpdated(
            msg.sender,
            _couponId,
            updatedCoupon.status,
            updatedCoupon.discountPercent
        );
    }

    function buyNode(uint256 _nodeId) public payable whenNotPaused {
        require(nodeTiers[_nodeId].price > 0, "Node does not exist");
        require(msg.value >= nodeTiers[_nodeId].price, "Insufficient funds");

        nodeContract.safeMint(msg.sender, _nodeId);
        emit Buy(_nodeId, msg.sender);
    }

    function buyAdmin(
        uint256 _nodeId,
        address nodeOwner
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(nodeTiers[_nodeId].price > 0, "Node does not exist");
        nodeContract.safeMint(nodeOwner, _nodeId);
        emit Buy(_nodeId, nodeOwner);
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
