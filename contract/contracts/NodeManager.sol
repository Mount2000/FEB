// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;
import "Node.sol";  // Chỉnh sửa đường dẫn tới file Node.sol nếu cần
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NodeManager is Pausable, AccessControl, Ownable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    Node public nodeContract;

    constructor(address _nodeContract) Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        nodeContract = Node(_nodeContract);  
    }

    struct NodeInformation {
        bool exists;
        bool status;
        string name;
        string metadata;
        uint256 price;
    }

    uint64 public nodeId;
    mapping(uint64 => NodeInformation) public nodeInformations;

    struct DiscountCoupon {
        bool status;
        uint8 discountPercent;
    }

    uint64 public couponId;
    mapping(uint64 => DiscountCoupon) public discountCoupons;

    // Events
    event AddedNode(
        address indexed user,
        uint64 nodeId,
        bool status,
        string name,
        string metadata,
        uint256 price
    );
    event UpdatedNode(
        address indexed user,
        uint64 nodeId,
        bool status,
        string name,
        string metadata,
        uint256 price
    );

    event DeletedNode(address indexed user, uint64 nodeId);

    event AddCoupon(
        address indexed user,
        uint64 couponId,
        bool status,
        uint8 discountPercent
    );

    event UpdateCoupon(
        address indexed user,
        uint64 couponId,
        bool status,
        uint8 discountPercent
    );

    event DeleteCoupon(address indexed user, uint64 couponId);

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // NODE INFORMATION MANAGEMENT

    function addNodeInfo(
        string memory name,
        string memory metadata,
        uint256 price
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        nodeId++;
        nodeInformations[nodeId] = NodeInformation(true, false, name, metadata, price);
        emit AddedNode(
            msg.sender,
            nodeId,
            nodeInformations[nodeId].status,
            name,
            metadata,
            price
        );
    }

    function getNodeInformation(
        uint64 _nodeId
    )
        public
        view
        returns (bool status, string memory name, string memory metadata, uint256 price)
    {
        return (
            nodeInformations[_nodeId].status,
            nodeInformations[_nodeId].name,
            nodeInformations[_nodeId].metadata,
            nodeInformations[_nodeId].price
        );
    }

    function updateNodeInformation(
        uint64 _nodeId,
        string memory newName,
        string memory newMetadata,
        bool newStatus,
        uint256 newPrice
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(nodeInformations[_nodeId].exists, "Node does not exist");
        nodeInformations[_nodeId].name = newName;
        nodeInformations[_nodeId].metadata = newMetadata;
        nodeInformations[_nodeId].status = newStatus;
        nodeInformations[_nodeId].price = newPrice;

        emit UpdatedNode(
            msg.sender,
            _nodeId,
            nodeInformations[_nodeId].status,
            nodeInformations[_nodeId].name,
            nodeInformations[_nodeId].metadata,
            nodeInformations[_nodeId].price
        );
    }

    function deleteNodeInformation(
        uint64 _nodeId
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(nodeInformations[_nodeId].exists, "Node does not exist");
        delete nodeInformations[_nodeId];
        emit DeletedNode(msg.sender, _nodeId);
    }

    // COUPON MANAGEMENT

    function addDiscountCoupon(
        uint8 discountPercent
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(discountPercent > 0, "Discount percent must be greater than 0");
        couponId++;
        discountCoupons[couponId] = DiscountCoupon(false, discountPercent);
        emit AddCoupon(
            msg.sender,
            couponId,
            discountCoupons[couponId].status,
            discountCoupons[couponId].discountPercent
        );
    }

    function getDiscountCoupon(
        uint64 _couponId
    ) public view returns (bool status, uint8 discountPercent) {
        return (
            discountCoupons[_couponId].status,
            discountCoupons[_couponId].discountPercent
        );
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
        emit UpdateCoupon(
            msg.sender,
            _couponId,
            discountCoupons[_couponId].status,
            discountCoupons[_couponId].discountPercent
        );
    }

    function deleteDiscountCoupon(
        uint64 _couponId
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(
            discountCoupons[_couponId].discountPercent > 0,
            "Coupon does not exist"
        );
        delete discountCoupons[_couponId];
        emit DeleteCoupon(msg.sender, _couponId);
    }

     function buyNode(uint64 _nodeId) public payable whenNotPaused {
        require(nodeInformations[_nodeId].exists, "Node does not exist");
        require(msg.value >= nodeInformations[_nodeId].price, "Insufficient funds");

        // Mint NFT and store metadata
        nodeContract.safeMint(msg.sender, _nodeId);
    }

}
