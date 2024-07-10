// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;
import "./Node.sol"; // Ensure the correct path to the Node.sol file
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract NodeManager is Pausable, AccessControl, Ownable {
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableSet for EnumerableSet.AddressSet;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    Node public nodeContract;

    struct NodeTier {
        bool status;
        string name;
        uint256 price;
    }

    uint256 private nodeTierId;
    mapping(uint256 => NodeTier) public nodeTiers;
    mapping(address => EnumerableSet.UintSet) private userNodeTiersIdLinks;
    mapping(uint256 => address) private nodeTiersIdUserLinks;
    mapping(address => EnumerableSet.UintSet) private discountCouponsOfOwner;
    mapping(uint256 => address) private discountCouponOwners;

    struct DiscountCoupon {
        bool status;
        uint8 discountPercent;
        string name;
        uint8 commissionPercent;
        string code;
    }
    uint256 private couponId;
    mapping(uint256 => DiscountCoupon) public discountCoupons;

    // Referral
    uint256 private referenceId;
    uint256 private referenceRate;
    struct ReferralInformation {
        string code;
        uint256 totalSales;
    }
    mapping(uint256 => ReferralInformation) private referrals;
    mapping(address => uint256) private userReferralIdLinks;
    mapping(uint256 => address) private referralIdUserLinks;
    // Events
    event AddedNode(
        address indexed user,
        uint256 nodeTierId,
        bool status,
        string name,
        uint256 price
    );
    event UpdatedNode(
        address indexed user,
        uint256 nodeTierId,
        bool status,
        string name,
        uint256 price
    );

    event AddCoupon(
        address indexed user,
        uint256 couponId,
        bool status,
        uint8 discountPercent
    );

    event UpdateCoupon(
        address indexed user,
        uint256 couponId,
        bool status,
        uint8 discountPercent
    );
    event Sale(
        address indexed user,
        uint256 nodeTierId,
        uint256 referralId,
        uint256 totalSales
    );
    event FundsWithdrawn(address indexed to, uint256 value);

    event GeneratedReferralCode(address indexed user, string code);

    constructor(address _nodeContract, uint256 _referenceRate)
        Ownable(msg.sender)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        require(_referenceRate <= 100, "Invalid input");
        referenceRate = _referenceRate;
        nodeContract = Node(_nodeContract);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getNodeContractAddress() public view returns (address) {
        return address(nodeContract);
    }

    function setNodeContractAddress(address _nodeContract) public {
        nodeContract = Node(_nodeContract);
    }

    // NODE Tier MANAGEMENT

    function addNodeTier(string memory name, uint256 price)
        public
        onlyRole(ADMIN_ROLE)
        whenNotPaused
    {
        require(price > 0, "Price must be greater than 0");
        nodeTierId++;
        NodeTier memory newNode = NodeTier(false, name, price);
        nodeTiers[nodeTierId] = newNode;
        emit AddedNode(
            msg.sender,
            nodeTierId,
            nodeTiers[nodeTierId].status,
            name,
            price
        );
    }

    function getNodeIdByIndex(address user, uint256 index)
        public
        view
        returns (uint256)
    {
        require(
            index < userNodeTiersIdLinks[user].length(),
            "Index out of bounds"
        );
        // uint256 nodeTierId = userNodeTiersIdLinks[user].at(index);
        return nodeTierId;
    }

    function getOwnerByNodeId(uint256 _nodeTierId)
        public
        view
        returns (address)
    {
        return nodeTiersIdUserLinks[_nodeTierId];
    }

    function getUserTotalNode(address user) public view returns (uint256) {
        return userNodeTiersIdLinks[user].length();
    }

    function getNodeTierDetails(uint256 _nodeTierId)
        public
        view
        returns (NodeTier memory)
    {
        return nodeTiers[_nodeTierId];
    }

    function getLastNodeTierId() public view returns (uint256) {
        return nodeTierId;
    }

    function updateNodeTier(
        uint256 _nodeTierId,
        string memory newName,
        bool newStatus,
        uint256 newPrice
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(nodeTiers[_nodeTierId].price > 0, "Node does not exist");
        require(newPrice > 0, "Price must be greater than 0");
        nodeTiers[_nodeTierId].name = newName;
        nodeTiers[_nodeTierId].status = newStatus;
        nodeTiers[_nodeTierId].price = newPrice;

        emit UpdatedNode(
            msg.sender,
            _nodeTierId,
            nodeTiers[_nodeTierId].status,
            nodeTiers[_nodeTierId].name,
            nodeTiers[_nodeTierId].price
        );
    }

    // COUPON MANAGEMENT

    function addDiscountCoupon(
        uint8 discountPercent,
        string memory name,
        uint8 commissionPercent,
        string memory code
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(discountPercent > 0, "Discount percent must be greater than 0");
        require(bytes(name).length > 0, "Coupon name must not be empty");
        require(bytes(code).length > 0, "Coupon code must not be empty");

        couponId++;
        DiscountCoupon memory newCoupon = DiscountCoupon(
            false,
            discountPercent,
            name,
            commissionPercent,
            code
        );
        discountCoupons[couponId] = newCoupon;

        emit AddCoupon(
            msg.sender,
            couponId,
            discountCoupons[couponId].status,
            discountCoupons[couponId].discountPercent
        );
    }

    function getDiscountCoupon(uint256 _couponId)
        public
        view
        returns (DiscountCoupon memory)
    {
        return discountCoupons[_couponId];
    }

    function getLastCouponId() public view returns (uint256) {
        return couponId;
    }

    function updateDiscountCoupon(
        uint256 _couponId,
        uint8 newDiscountPercent,
        bool newStatus,
        string memory newName,
        uint8 newCommissionPercent,
        string memory newCode
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(
            discountCoupons[_couponId].discountPercent > 0,
            "Coupon does not exist"
        );
        require(
            newDiscountPercent > 0,
            "Discount percent must be greater than 0"
        );
        require(bytes(newName).length > 0, "Coupon name must not be empty");
        require(bytes(newCode).length > 0, "Coupon code must not be empty");

        discountCoupons[_couponId].discountPercent = newDiscountPercent;
        discountCoupons[_couponId].status = newStatus;
        discountCoupons[_couponId].name = newName;
        discountCoupons[_couponId].commissionPercent = newCommissionPercent;
        discountCoupons[_couponId].code = newCode;

        emit UpdateCoupon(
            msg.sender,
            _couponId,
            discountCoupons[_couponId].status,
            discountCoupons[_couponId].discountPercent
        );
    }

    function buyNode(
        uint256 _nodeTierId,
        uint256 referralId,
        string memory metadata,
        uint256 discountCouponId
    ) public payable whenNotPaused returns (string memory) {
        uint256 price = nodeTiers[_nodeTierId].price;
        uint8 discountPercent = 0;
        uint256 discountValue = 0;
        address caller = msg.sender;
        require(price > 0, "Node does not exist");

        uint8 commissionPercent = 0;
        if (discountCouponId != 0) {
            DiscountCoupon memory coupon = discountCoupons[discountCouponId];
            require(coupon.status, "Discount coupon does not exist");
            discountPercent = coupon.discountPercent;
            commissionPercent = coupon.commissionPercent;
            discountValue = (price / 100) * discountPercent;

            address discountOwner = getOwnerByDiscountCouponId(
                discountCouponId
            );
            uint256 commissionValue = (price / 100) * commissionPercent;
            require(
                commissionValue > 0,
                "Commission value must be greater than 0"
            );
            require(
                address(this).balance >= commissionValue,
                "Not enough balance for commission"
            );

            (bool commissionSent, ) = discountOwner.call{
                value: commissionValue
            }("");
            require(commissionSent, "Failed to send commission Ether");
        }

        uint256 expectedValue = price - discountValue;
        require(msg.value == expectedValue, "Insufficient funds");
        require(
            nodeTiersIdUserLinks[_nodeTierId] == address(0),
            "Node tier already owned"
        );

        uint256 totalSales = 0;
        if (
            referralId > 0 &&
            referralIdUserLinks[referralId] != address(0) &&
            referralIdUserLinks[referralId] != caller
        ) {
            address referralsOwner = referralIdUserLinks[referralId];
            totalSales = (expectedValue / 100) * referenceRate;
            require(address(this).balance >= totalSales, "Not enough balance");
            (bool sent, ) = referralsOwner.call{value: totalSales}("");
            require(sent, "Failed to send Ether");
            referrals[referralId].totalSales += totalSales;
        }

        nodeContract.safeMint(caller, _nodeTierId, metadata);
        userNodeTiersIdLinks[caller].add(_nodeTierId);
        nodeTiersIdUserLinks[_nodeTierId] = caller;

        string memory _code;
        if (userReferralIdLinks[caller] == 0) {
            referenceId++;
            uint256 currentTimestamp = block.timestamp;
            _code = string(
                abi.encodePacked(
                    "BachiSwap_",
                    uint256str(referenceId),
                    "_",
                    uint256str(currentTimestamp)
                )
            );
            userReferralIdLinks[caller] = referenceId;
            referralIdUserLinks[referenceId] = caller;
            referrals[referenceId].code = _code;

            emit GeneratedReferralCode(caller, _code);
        }
        emit Sale(caller, _nodeTierId, referralId, totalSales);
        return _code;
    }

   
    function setOwnerByDiscountCouponId(address owner, uint256 couponIdentifier)
       public
        onlyRole(ADMIN_ROLE)
        whenNotPaused
    {
        require(
            discountCoupons[couponIdentifier].status,
            "Discount coupon does not exist"
        );
        discountCouponOwners[couponIdentifier] = owner;
    }

    // Hàm truy xuất chủ sở hữu của mã giảm giá
    function getOwnerByDiscountCouponId(uint256 CouponId)
        public
        view
        returns (address)
    {
        require(
            discountCoupons[CouponId].status,
            "Discount coupon does not exist"
        );
        return discountCouponOwners[CouponId];
    }

    function getReferralIdByOwner(address owner) public view returns (uint256) {
        return userReferralIdLinks[owner];
    }

    function getOwnerByReferralId(uint256 referralId)
        public
        view
        returns (address)
    {
        return referralIdUserLinks[referralId];
    }

    function getReferralInfo(uint256 referralId)
        public
        view
        returns (string memory code, uint256 totalSales)
    {
        return (referrals[referralId].code, referrals[referralId].totalSales);
    }

    function getReferenceRate() public view returns (uint256) {
        return referenceRate;
    }

    function setReferenceRate(uint256 _referenceRate)
        public
        onlyRole(ADMIN_ROLE)
        whenNotPaused
    {
        require(_referenceRate <= 100, "Invalid input");
        referenceRate = _referenceRate;
    }

    function buyAdmin(
        uint256 _nodeTierId,
        address nodeOwner,
        string memory metadata
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(nodeTiers[_nodeTierId].price > 0, "Node does not exist");
        require(
            nodeTiersIdUserLinks[_nodeTierId] == address(0),
            "Node tier already owned"
        );
        nodeContract.safeMint(nodeOwner, _nodeTierId, metadata);
        userNodeTiersIdLinks[msg.sender].add(_nodeTierId);
        nodeTiersIdUserLinks[_nodeTierId] = msg.sender;
        emit Sale(msg.sender, _nodeTierId, 0, 0);
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

    // Helper function to convert uint256 to string
    function uint256str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    // Fallback function to receive Ether
    receive() external payable {}
}

