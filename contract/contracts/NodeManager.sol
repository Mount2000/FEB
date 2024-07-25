// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;
import "./BachiNode.sol";
import "./BachiToken.sol";
import "./Staking.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract NodeManager is Pausable, AccessControl, Ownable {
    using EnumerableSet for EnumerableSet.UintSet;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    BachiNode private bachiNodeContract;
    BachiToken private tokenContract;
    Staking private stakingContract;

    struct NodeTier {
        bool status;
        string name;
        uint256 price;
        uint256 hashrate;
        uint256 farmSpeedBachi;
        uint256 farmSpeedTaiko;
        uint8 referralRate;
    }

    uint256 public nodeTierId;
    mapping(uint256 => NodeTier) public nodeTiers;
    mapping(uint256 => uint256) public nodeIdNodeTiersIdLinks;
    mapping(address => EnumerableSet.UintSet) private userNodeIdLinks;
    mapping(uint256 => address) public nodeIdUserLinks;

    uint256 public couponId;
    struct DiscountCoupon {
        bool status;
        uint8 discountPercent;
        string name;
        uint8 commissionPercent;
        string code;
    }
    mapping(uint256 => DiscountCoupon) public discountCoupons;
    mapping(address => EnumerableSet.UintSet)
        private userdiscountCouponsIdLinks;
    mapping(uint256 => address) public discountCouponsIdUserLinks;

    // Referral
    uint256 public referenceId;
    struct ReferralInformation {
        string code;
        uint256 totalSales;
    }
    mapping(uint256 => ReferralInformation) public referrals;
    mapping(address => uint256) public userReferralIdLinks;
    mapping(uint256 => address) public referralIdUserLinks;

    // Events
    event AddedNode(
        address indexed user,
        uint256 nodeTierId,
        bool status,
        string name,
        uint256 price,
        uint256 hashrate,
        uint256 farmSpeedBachi,
        uint256 farmSpeedTaiko,
        uint8 ReferralRate
    );

    event UpdatedNode(
        address indexed user,
        uint256 nodeTierId,
        bool status,
        string name,
        uint256 price,
        uint256 hashrate,
        uint256 farmSpeedBachi,
        uint256 farmSpeedTaiko,
        uint8 ReferralRate
    );

    event AddCoupon(
        address indexed user,
        uint256 couponId,
        bool status,
        uint8 discountPercent,
        string name,
        uint8 commissionPercent,
        string code
    );

    event UpdateCoupon(
        address indexed user,
        uint256 couponId,
        bool status,
        uint8 discountPercent,
        string name,
        uint8 commissionPercent
    );
    event Sale(
        address indexed user,
        uint256 nodeTierId,
        uint256 referralId,
        uint256 totalSales
    );
    event FundsWithdrawn(address indexed to, uint256 value);
    event GeneratedReferralCode(address indexed user, string code);
    event NodeTransferred(
        address indexed previousOwner,
        address indexed newOwner,
        uint256 indexed nodeTierId
    );

    constructor(
        address _bachiNodeContract,
        address _tokenContract,
        address _stakingContract
    ) Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        tokenContract = BachiToken(_tokenContract);
        bachiNodeContract = BachiNode(_bachiNodeContract);
        stakingContract = Staking(_stakingContract);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getNodeContractAddress() public view returns (address) {
        return address(bachiNodeContract);
    }

    function setNodeContractAddress(address _bachiNodeContract)
        public
        onlyRole(ADMIN_ROLE)
    {
        bachiNodeContract = BachiNode(_bachiNodeContract);
    }

    function getTokenContractAddress() public view returns (address) {
        return address(tokenContract);
    }

    function setTokenContractAddress(address _tokenContract)
        public
        onlyRole(ADMIN_ROLE)
    {
        tokenContract = BachiToken(_tokenContract);
    }

    function getStakingContractAddress() public view returns (address) {
        return address(stakingContract);
    }

    function setStakingContractAddress(address _stakingContract)
        public
        onlyRole(ADMIN_ROLE)
    {
        stakingContract = Staking(_stakingContract);
    }

    // NODE Tier MANAGEMENT

    function addNodeTier(
        string memory name,
        uint256 price,
        uint256 hashrate,
        uint256 farmSpeedBachi,
        uint256 farmSpeedTaiko,
        uint8 ReferralRate
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(
            price > 0 &&
                hashrate > 0 &&
                farmSpeedBachi > 0 &&
                farmSpeedTaiko > 0,
            "Price, Hashrate and FarmSpeed must be greater than 0"
        );
        nodeTierId++;
        NodeTier memory newNode = NodeTier(
            true,
            name,
            price,
            hashrate,
            farmSpeedBachi,
            farmSpeedTaiko,
            ReferralRate
        );
        nodeTiers[nodeTierId] = newNode;
        emit AddedNode(
            msg.sender,
            nodeTierId,
            nodeTiers[nodeTierId].status,
            name,
            price,
            hashrate,
            farmSpeedBachi,
            farmSpeedTaiko,
            ReferralRate
        );
    }

    function updateNodeTier(
        uint256 _nodeTierId,
        string memory name,
        bool status,
        uint256 price,
        uint256 hashrate,
        uint256 farmSpeedBachi,
        uint256 farmSpeedTaiko,
        uint8 referralRate
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        NodeTier memory newNode = nodeTiers[_nodeTierId];
        require(newNode.price > 0, "Node does not exist");
        require(
            price > 0 &&
                hashrate > 0 &&
                farmSpeedBachi > 0 &&
                farmSpeedTaiko > 0,
            "Price, Hashrate and FarmSpeed must be greater than 0"
        );

        newNode.name = name;
        newNode.status = status;
        newNode.price = price;
        newNode.hashrate = hashrate;
        newNode.farmSpeedBachi = farmSpeedBachi;
        newNode.farmSpeedTaiko = farmSpeedTaiko;
        newNode.referralRate = referralRate;

        nodeTiers[_nodeTierId] = newNode;

        emit UpdatedNode(
            msg.sender,
            _nodeTierId,
            newNode.status,
            newNode.name,
            newNode.price,
            newNode.hashrate,
            newNode.farmSpeedBachi,
            newNode.farmSpeedTaiko,
            newNode.referralRate
        );
    }

    //cronjob addnodetier, môngdb, pull datanodetier
    function getNodeIdByIndex(address user, uint256 index)
        public
        view
        returns (uint256)
    {
        require(index < userNodeIdLinks[user].length(), "Index out of bounds");
        return userNodeIdLinks[user].at(index);
    }

    function getUserTotalNode(address user) public view returns (uint256) {
        return userNodeIdLinks[user].length();
    }

    function getFarmSpeed(uint256 nodeId)
        public
        view
        returns (uint256, uint256)
    {
        uint256 _nodeTierId = nodeIdNodeTiersIdLinks[nodeId];
        uint256 farmSpeedBachi = nodeTiers[_nodeTierId].farmSpeedBachi;
        uint256 farmSpeedTaiko = nodeTiers[_nodeTierId].farmSpeedTaiko;
        return (farmSpeedBachi, farmSpeedTaiko);
    }

    // COUPON MANAGEMENT

    function addDiscountCoupon(
        uint8 discountPercent,
        string memory name,
        uint8 commissionPercent,
        address owner
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(discountPercent > 0, "Discount percent must be greater than 0");
        require(bytes(name).length > 0, "Coupon name must not be empty");

        couponId++;
        string memory _code;
        uint256 currentTimestamp = block.timestamp;
        _code = string(
            abi.encodePacked(
                "BachiSwapCP_",
                uint256str(couponId),
                "_",
                uint256str(currentTimestamp)
            )
        );
        DiscountCoupon memory newCoupon = DiscountCoupon(
            true,
            discountPercent,
            name,
            commissionPercent,
            _code
        );
        discountCoupons[couponId] = newCoupon;
        discountCouponsIdUserLinks[couponId] = owner;
        userdiscountCouponsIdLinks[owner].add(couponId);

        emit AddCoupon(
            owner,
            couponId,
            newCoupon.status,
            newCoupon.discountPercent,
            newCoupon.name,
            newCoupon.commissionPercent,
            newCoupon.code
        );
    }

    function updateDiscountCoupon(
        uint256 _couponId,
        uint8 discountPercent,
        bool status,
        string memory name,
        uint8 commissionPercent
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(
            discountCoupons[_couponId].discountPercent > 0,
            "Coupon does not exist"
        );
        require(discountPercent > 0, "Discount percent must be greater than 0");
        require(bytes(name).length > 0, "Coupon name must not be empty");

        discountCoupons[_couponId].discountPercent = discountPercent;
        discountCoupons[_couponId].status = status;
        discountCoupons[_couponId].name = name;
        discountCoupons[_couponId].commissionPercent = commissionPercent;

        emit UpdateCoupon(
            msg.sender,
            _couponId,
            discountCoupons[_couponId].status,
            discountCoupons[_couponId].discountPercent,
            discountCoupons[_couponId].name,
            discountCoupons[_couponId].commissionPercent
        );
    }

    function multiBuyNode(
        uint256 _nodeTierId,
        uint256 referralId,
        string memory metadata,
        uint256 discountCouponId,
        uint256 quality
    ) public payable whenNotPaused returns (string memory) {
        require(
            quality > 0 && quality <= 10,
            "Quality must be between 1 and 10"
        );
        uint256 price = nodeTiers[_nodeTierId].price * quality;
        uint256 discountValue = 0;
        uint256 totalSales = 0;
        address caller = msg.sender;
        require(price > 0, "Node tier does not exist");

        if (
            discountCouponId != 0 &&
            discountCouponsIdUserLinks[discountCouponId] != caller
        ) {
            DiscountCoupon memory coupon = discountCoupons[discountCouponId];
            NodeTier memory nodetier = nodeTiers[_nodeTierId];
            require(
                coupon.discountPercent > 0,
                "Discount coupon does not exist"
            );
            require(coupon.status, "Discount coupon is not active");
            require(nodetier.status, "Node is not active");
            discountValue = (price * coupon.discountPercent) / 100;

            address discountOwner = discountCouponsIdUserLinks[
                discountCouponId
            ];
            uint256 commissionValue = (price * coupon.commissionPercent) / 100;
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

        if (
            referralId > 0 &&
            referralIdUserLinks[referralId] != address(0) &&
            referralIdUserLinks[referralId] != caller
        ) {
            address referralsOwner = referralIdUserLinks[referralId];
            totalSales =
                (expectedValue * nodeTiers[_nodeTierId].referralRate) /
                100;
            require(address(this).balance >= totalSales, "Not enough balance");
            (bool sent, ) = referralsOwner.call{value: totalSales}("");
            require(sent, "Failed to send Ether");
            referrals[referralId].totalSales += totalSales;
        }

        string memory _code;

        for (uint256 i = 0; i < quality; i++) {
            uint256 nodeId = bachiNodeContract.lastTokenId() + 1;
            bachiNodeContract.safeMint(caller, nodeId, metadata);
            nodeIdNodeTiersIdLinks[nodeId] = _nodeTierId;
            userNodeIdLinks[caller].add(nodeId);
            nodeIdUserLinks[nodeId] = caller;
        }

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

    function getDiscountIdByIndex(address user, uint256 index)
        public
        view
        returns (uint256)
    {
        require(
            index < userdiscountCouponsIdLinks[user].length(),
            "Index out of bounds"
        );
        return userdiscountCouponsIdLinks[user].at(index);
    }

    function getTotalDiscountByOwner(address owner)
        public
        view
        returns (uint256)
    {
        return userdiscountCouponsIdLinks[owner].length();
    }

    function buyAdmin(
        uint256 _nodeTierId,
        address nodeOwner,
        string memory metadata
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(nodeTiers[_nodeTierId].price > 0, "Node tier does not exist");
        uint256 nodeId = bachiNodeContract.lastTokenId() + 1;
        bachiNodeContract.safeMint(nodeOwner, nodeId, metadata);
        nodeIdNodeTiersIdLinks[nodeId] = _nodeTierId;
        userNodeIdLinks[nodeOwner].add(nodeId);
        nodeIdUserLinks[nodeId] = nodeOwner;
        emit Sale(nodeOwner, _nodeTierId, 0, 0);
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
}
