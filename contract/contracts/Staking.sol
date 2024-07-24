// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;
import "./BachiNode.sol";
import "./BachiToken.sol";
import "./NodeManager.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Staking is Pausable, AccessControl, Ownable {
    using EnumerableSet for EnumerableSet.UintSet;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    BachiNode public bachiNodeContract;
    BachiToken private tokenContract;
    NodeManager private nodeManagerContract;

    uint256 public bachiMinClaimAmount = 0;
    uint256 public taikoMinClaimAmount = 3 * (10 ** 18);
    uint256 public stakeId;

    struct StakeInformation {
        uint256 bachiStakeStartTime;
        uint256 taikoStakeStartTime;
        uint256 nodeId;
    }

    struct RewardClaimed {
        uint256 bachiRewardAmount;
        uint256 taikoRewardAmount;
    }

    mapping(address => RewardClaimed) public rewardClaimedInfors;

    mapping(uint256 => StakeInformation) public stakeInfors; //stakeId => stakeInfo
    mapping(address => EnumerableSet.UintSet) private userStakes; // user => stakeIds
    mapping(uint256 => uint256) public nodeIdStakeIdLinks; // nodeId => stakeId
    mapping(uint256 => address) public stakeIdUserLinks; // nodeId => stakeId

    // event
    event FundsWithdrawn(address indexed to, uint256 value);
    event Staked(
        address indexed user,
        uint256 indexed _stakeId,
        uint256 indexed nodeId,
        uint256 stakeTime
    );
    event Claimed(
        address indexed user,
        uint256 indexed _stakeId,
        uint256 claimTime,
        uint256 rewardBachi,
        uint256 rewardTaiko
    );
    event Deposited(address indexed user, uint256 amount);
    event NodeTransferred(
        address indexed previousOwner,
        address indexed newOwner,
        uint256 indexed nodeId
    );
    error AlreadyStaked(uint256 nodeId);

    constructor(
        address _bachiNodeContract,
        address _tokenContract,
        address _nodeManagerContract
    ) Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        tokenContract = BachiToken(_tokenContract);
        bachiNodeContract = BachiNode(_bachiNodeContract);
        nodeManagerContract = NodeManager(_nodeManagerContract);
    }

    modifier onlyNftOwner(uint256 _nodeId) {
        require(
            bachiNodeContract.ownerOf(_nodeId) == msg.sender,
            "Unauthorized: Only nft owner"
        );
        _;
    }

    modifier onlyNodeOwner(uint256 _nodeId) {
        require(
            nodeManagerContract.nodeIdUserLinks(_nodeId) == msg.sender,
            "Unauthorized: Only node owner"
        );
        _;
    }

    modifier onlyNodeManager() {
        require(
            address(nodeManagerContract) == msg.sender,
            "Unauthorized: Only node manager"
        );
        _;
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

    function setNodeContractAddress(
        address _bachiNodeContract
    ) public onlyRole(ADMIN_ROLE) {
        bachiNodeContract = BachiNode(_bachiNodeContract);
    }

    function getTokenContractAddress() public view returns (address) {
        return address(tokenContract);
    }

    function setTokenContractAddress(
        address _tokenContract
    ) public onlyRole(ADMIN_ROLE) {
        tokenContract = BachiToken(_tokenContract);
    }

    function getNodeManagerContractAddress() public view returns (address) {
        return address(nodeManagerContract);
    }

    function setNodeManagerContractAddress(
        address _nodeManagerContract
    ) public onlyRole(ADMIN_ROLE) {
        nodeManagerContract = NodeManager(_nodeManagerContract);
    }

    function setBachiMinClaimAmount(
        uint256 _bachiMinClaimAmount
    ) public onlyRole(ADMIN_ROLE) {
        bachiMinClaimAmount = _bachiMinClaimAmount;
    }

    function setTaikoMinClaimAmount(
        uint256 _taikoMinClaimAmount
    ) public onlyRole(ADMIN_ROLE) {
        taikoMinClaimAmount = _taikoMinClaimAmount;
    }

    function stake(uint256 _nodeId) public onlyNftOwner(_nodeId) whenNotPaused {
        address staker = msg.sender;
        uint256 currentTimestamp = block.timestamp;
        require(nodeIdStakeIdLinks[_nodeId] == 0, "Node already staked");
        require(
            bachiNodeContract.getApproved(_nodeId) == address(this) ||
                bachiNodeContract.isApprovedForAll(staker, address(this)),
            "Token not approved for transfer"
        );
        bachiNodeContract.transferFrom(staker, address(this), _nodeId);

        stakeId++;

        StakeInformation memory stakeInfo = StakeInformation({
            bachiStakeStartTime: currentTimestamp,
            taikoStakeStartTime: currentTimestamp,
            nodeId: _nodeId
        });

        stakeInfors[stakeId] = stakeInfo;
        userStakes[staker].add(stakeId);
        nodeIdStakeIdLinks[_nodeId] = stakeId;
        stakeIdUserLinks[stakeId] = staker;

        emit Staked(staker, stakeId, _nodeId, currentTimestamp);
    }

    function unstake(uint256 _stakeId) public whenNotPaused {
        address staker = msg.sender;
        uint256 nodeId = stakeInfors[_stakeId].nodeId;
        require(
            stakeIdUserLinks[_stakeId] == staker,
            "Not the owner of this stake"
        );
        require(
            nodeIdStakeIdLinks[nodeId] == _stakeId,
            "Node is not staked with this stakeId"
        );

        delete stakeInfors[_stakeId];
        userStakes[staker].remove(_stakeId);
        nodeIdStakeIdLinks[nodeId] = 0;
        stakeIdUserLinks[_stakeId] = address(0);

        bachiNodeContract.transferFrom(address(this), staker, nodeId);

        emit Staked(staker, _stakeId, nodeId, block.timestamp);
    }

    function claimReward(uint256 _nodeId, uint8 claimMode)
        public
        whenNotPaused
    {
        uint256 _stakeId = nodeIdStakeIdLinks[_nodeId];
        StakeInformation memory stakeInfo = stakeInfors[_stakeId];
        address staker = nodeManagerContract.nodeIdUserLinks(_nodeId);
        require(staker == msg.sender, "Unauthorized: Only staker can claim");
        require (_stakeId > 0,"stakeid does not exist");
        uint256 currentTimestamp = block.timestamp;
        uint256 bachiTotalTimeStaking = currentTimestamp - stakeInfo.bachiStakeStartTime;
        uint256 taikoTotalTimeStaking = currentTimestamp - stakeInfo.taikoStakeStartTime;
        uint256 bachiRewardAmount = 0;
        uint256 taikoRewardAmount = 0;

        (uint256 farmSpeedBachi, uint256 farmSpeedTaiko) = nodeManagerContract.getFarmSpeed(_nodeId);

        if (claimMode == 0) {
            bachiRewardAmount = farmSpeedBachi * bachiTotalTimeStaking;
            require(
                bachiRewardAmount >= bachiMinClaimAmount,
                "Claim amount is too small"
            );
            tokenContract.mint(staker, bachiRewardAmount);
            stakeInfors[stakeId].bachiStakeStartTime = currentTimestamp;
            rewardClaimedInfors[msg.sender].bachiRewardAmount += bachiRewardAmount;
        } else if (claimMode == 1) {
            taikoRewardAmount = farmSpeedTaiko * taikoTotalTimeStaking;
            require(
                taikoRewardAmount >= taikoMinClaimAmount,
                "Claim amount is too small"
            );
            require(
                address(this).balance >= taikoRewardAmount,
                "Not enough balance"
            );
            (bool sent, ) = staker.call{value: taikoRewardAmount}("");
            require(sent, "Failed to send Ether");
            stakeInfors[stakeId].taikoStakeStartTime = currentTimestamp;
            rewardClaimedInfors[msg.sender]
                .taikoRewardAmount += taikoRewardAmount;
        } else {
            bachiRewardAmount = farmSpeedBachi * bachiTotalTimeStaking;
            taikoRewardAmount = farmSpeedTaiko * taikoTotalTimeStaking;
            require(
                bachiRewardAmount >= bachiMinClaimAmount &&
                    taikoRewardAmount >= taikoMinClaimAmount,
                "Claim amount is too small"
            );
            tokenContract.mint(staker, bachiRewardAmount);
            require(
                address(this).balance >= taikoRewardAmount,
                "Not enough balance"
            );
            (bool sent, ) = staker.call{value: taikoRewardAmount}("");
            require(sent, "Failed to send Ether");
            stakeInfors[stakeId].bachiStakeStartTime = currentTimestamp;
            stakeInfors[stakeId].taikoStakeStartTime = currentTimestamp;
            rewardClaimedInfors[msg.sender].taikoRewardAmount += taikoRewardAmount;
            rewardClaimedInfors[msg.sender].bachiRewardAmount += bachiRewardAmount;
        }

        emit Claimed(
            staker,
            stakeId,
            currentTimestamp,
            bachiRewardAmount,
            taikoRewardAmount
        );
    }

    function getRewardAmounts(
        uint256 _nodeId
    )
        public
        view
        returns (uint256 bachiRewardAmount, uint256 taikoRewardAmount)
    {
        uint256 _stakeId = nodeIdStakeIdLinks[_nodeId];
        StakeInformation memory stakeInfo = stakeInfors[_stakeId];
        uint256 currentTimestamp = block.timestamp;
        uint256 bachiTotalTimeStaking = currentTimestamp - stakeInfo.bachiStakeStartTime;
        uint256 taikoTotalTimeStaking = currentTimestamp - stakeInfo.taikoStakeStartTime;
        (uint256 farmSpeedBachi, uint256 farmSpeedTaiko) = nodeManagerContract.getFarmSpeed(stakeInfo.nodeId);
        bachiRewardAmount = farmSpeedBachi * bachiTotalTimeStaking;
        taikoRewardAmount = farmSpeedTaiko * taikoTotalTimeStaking;
        return (bachiRewardAmount, taikoRewardAmount);
    }

    function getTotalNodeStaked(address staker) public view returns (uint256) {
        return userStakes[staker].length();
    }

    function getStakeIdByIndex(
        address staker,
        uint256 index
    ) public view returns (uint256) {
        require(index < userStakes[staker].length(), "Index out of bounds");
        return userStakes[staker].at(index);
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        emit Deposited(msg.sender, msg.value);
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
}