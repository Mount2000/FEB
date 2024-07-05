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

    constructor(address _nodeContract) Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        nodeContract = Node(_nodeContract);
    }

    struct NodeTier {
        bool status;
        string name;
        string metadata;
        uint256 price;
    }

    uint64 public nodeId;
    mapping(uint64 => NodeTier) public nodeTiers;

    struct DiscountCoupon {
        bool status;
        uint8 discountPercent;
    }

    uint64 public couponId;
    mapping(uint64 => DiscountCoupon) public discountCoupons;

    // Events
    event NodeAdded(
        address indexed user,
        uint64 nodeId,
        bool status,
        string name,
        string metadata,
        uint256 price
    );
    event NodeUpdated(
        address indexed user,
        uint64 nodeId,
        bool status,
        string name,
        string metadata,
        uint256 price
    );
    event NodeDeleted(address indexed user, uint64 nodeId);

    event CouponAdded(
        address indexed user,
        uint64 couponId,
        bool status,
        uint8 discountPercent
    );
    event CouponUpdated(
        address indexed user,
        uint64 couponId,
        bool status,
        uint8 discountPercent
    );
    event CouponDeleted(address indexed user, uint64 couponId);

    event FundsWithdrawn(address indexed to, uint256 value);

    event Buy(uint64 indexed nodeId, address indexed nodeOwner);

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // NODE Tier MANAGEMENT

    function addNodeTier(
        string memory name,
        string memory metadata,
        uint256 price
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(price > 0, "Price must be greater than 0");
        nodeId++;
        nodeTiers[nodeId] = NodeTier(false, name, metadata, price);
        emit NodeAdded(
            msg.sender,
            nodeId,
            nodeTiers[nodeId].status,
            name,
            metadata,
            price
        );
    }

    function getNodeTierDetails(uint64 _nodeId)
        public
        view
        returns (NodeTier memory)
    {
        return nodeTiers[_nodeId];
    }

    function updateNodeTier(
        uint64 _nodeId,
        string memory newName,
        string memory newMetadata,
        bool newStatus,
        uint256 newPrice
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(nodeTiers[_nodeId].price > 0, "Node does not exist");
        require(newPrice > 0, "Price must be greater than 0");
        nodeTiers[_nodeId].name = newName;
        nodeTiers[_nodeId].metadata = newMetadata;
        nodeTiers[_nodeId].status = newStatus;
        nodeTiers[_nodeId].price = newPrice;

        emit NodeUpdated(
            msg.sender,
            _nodeId,
            nodeTiers[_nodeId].status,
            nodeTiers[_nodeId].name,
            nodeTiers[_nodeId].metadata,
            nodeTiers[_nodeId].price
        );
    }

    // COUPON MANAGEMENT

    function addDiscountCoupon(uint8 discountPercent)
        public
        onlyRole(ADMIN_ROLE)
        whenNotPaused
    {
        require(discountPercent > 0, "Discount percent must be greater than 0");
        couponId++;
        discountCoupons[couponId] = DiscountCoupon(false, discountPercent);
        emit CouponAdded(
            msg.sender,
            couponId,
            discountCoupons[couponId].status,
            discountCoupons[couponId].discountPercent
        );
    }

    function getDiscountCoupon(uint64 _couponId)
        public
        view
        returns (DiscountCoupon memory)
    {
        return discountCoupons[_couponId];
    }

    function updateDiscountCoupon(
        uint64 _couponId,
        uint8 newDiscountPercent,
        bool newStatus
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(
            discountCoupons[_couponId].discountPercent > 0,
            "Coupon does not exist"
        );
        discountCoupons[_couponId].discountPercent = newDiscountPercent;
        discountCoupons[_couponId].status = newStatus;
        emit CouponUpdated(
            msg.sender,
            _couponId,
            discountCoupons[_couponId].status,
            discountCoupons[_couponId].discountPercent
        );
    }

    function buyNode(uint64 _nodeId) public payable whenNotPaused {
        require(nodeTiers[_nodeId].price > 0, "Node does not exist");
        require(msg.value >= nodeTiers[_nodeId].price, "Insufficient funds");

        nodeContract.safeMint(msg.sender, _nodeId);
        emit Buy(_nodeId, msg.sender);
    }

    function buyAdmin(uint64 _nodeId, address nodeOwner)
        public
        onlyRole(ADMIN_ROLE)
        whenNotPaused
    {
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
