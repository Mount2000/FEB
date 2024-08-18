pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract BachiStaking is Pausable, Ownable(msg.sender), AccessControl{
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    IERC20 public BachiToken;
    IERC20 public TaikoToken;
    struct UnstakeRequest{
        uint amount;
        uint requestTime;
    }
    mapping(address => uint) public stakeBalances;
    mapping(address => bool) public isStaker;
    mapping(address => UnstakeRequest) public unstakeRequests; // store time user request unstake
    mapping(address => uint) public rewardBalance;
    mapping(address => bool) public isClaimed; // User only can claim once per cycle, true if user claimed in current cycle
    uint public rewardPool;
    uint public totalStaked;
    uint public rewardRate; // reward/stakeBalance
    uint public limitUnstakeTime; // the delay time to unstake after request unstake
    bool public isLocked; // allow stake and unstake when locked is false and allow claim when locked is true
    bool public awardStarted;

    event Stake(address indexed user, uint amount);
    event RequestUnstake(address indexed user, uint amount, uint timeRequest);
    event CancelRequestUnstake(address indexed user);
    event Unstake(address indexed user, uint amount);
    event ClaimReward(address indexed user, uint amount);

    constructor(uint _limitUnstakeTime, IERC20 _BachiToken, IERC20 _TaikoToken){
        limitUnstakeTime = _limitUnstakeTime;
        BachiToken = _BachiToken;
        TaikoToken = _TaikoToken;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function setAdminRole(address admin) public onlyOwner{
        _grantRole(ADMIN_ROLE, admin);
    }

    function setBachiToken(IERC20 _BachiToken) public onlyOwner{
        BachiToken = _BachiToken;
    }

    function setTaikoToken(IERC20 _TaikoToken) public onlyOwner{
        BachiToken = _TaikoToken;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function changeLocked() public onlyOwner{
        isLocked = !isLocked;
    }

    function changeAwardStarted() public onlyOwner{
        awardStarted = !awardStarted;
    }

    function setLimitUnstakeTime(uint _limitUnstakeTime) public onlyOwner{
        limitUnstakeTime = _limitUnstakeTime;
    }
    
    function setRewardRate(uint rate) public onlyOwner{
        rewardRate = rate;
    }

    function award(address user) public onlyRole(ADMIN_ROLE){
        require(rewardRate > 0, "Do not set reward rate");
        require(awardStarted, "Awarding is not allowd yet");
        require(isStaker[user], "User is not staker");
        rewardBalance[msg.sender] += stakeBalances[msg.sender] * rewardRate;
    }

    function stake(uint _amount) public whenNotPaused{
        require(!isLocked, "Stacking is not allowed yet");
        BachiToken.transferFrom(msg.sender, address(this), _amount);
        stakeBalances[msg.sender] += _amount;
        totalStaked += _amount;
        isStaker[msg.sender] = true;
        emit Stake(msg.sender, _amount);
    }

    function requestUnstake(uint _amount) public whenNotPaused{
        require(!isLocked, "Request unstacking is not allowed yet");
        require(isStaker[msg.sender], "You did not stake yet");
        require(_amount <= stakeBalances[msg.sender], "Insufficient staking balance");
        unstakeRequests[msg.sender] = UnstakeRequest(_amount, block.timestamp);
        emit RequestUnstake(msg.sender, _amount, block.timestamp);
    }

    function cancelRequestUnstake() public{
        require(unstakeRequests[msg.sender].amount != 0, "You did not request unstacking yet");
        delete(unstakeRequests[msg.sender]);
        emit CancelRequestUnstake(msg.sender);
    }

    function unstake(uint _amount) public whenNotPaused{
        require(!isLocked, "Unstacking is not allowed yet");
        require(_amount <= unstakeRequests[msg.sender].amount, "Insufficient unstake balance");
        require(unstakeRequests[msg.sender].requestTime + limitUnstakeTime >= block.timestamp, "Unstaking is not allowed yet");
        BachiToken.transferFrom(address(this), msg.sender, _amount);
        totalStaked -= _amount;
        stakeBalances[msg.sender] -= _amount;
        if(stakeBalances[msg.sender] == 0){
            isStaker[msg.sender] = false;
        }
        unstakeRequests[msg.sender].amount -= _amount;
        isStaker[msg.sender] = false;
        emit Unstake(msg.sender, _amount);
    }

    function claimReward(uint amount) public whenNotPaused{
        require(isLocked, "Claiming reward is not allowed yet");
        require(amount <= rewardBalance[msg.sender], "Insufficient reward balance");
        require(!isClaimed[msg.sender], "You already claimed");
        require(amount <= rewardPool, "Do not have enought reward in pool");
        rewardBalance[msg.sender] -= amount;
        rewardPool -= amount;
        TaikoToken.transferFrom(address(this), msg.sender, amount);
        isClaimed[msg.sender] = true;
        emit ClaimReward(msg.sender, amount);
    }

    function addRewardPool(uint amount) public onlyOwner{
        TaikoToken.transferFrom(msg.sender, address(this), amount);
        rewardPool += amount;
    }

    function withdrawReward(uint amount) public onlyOwner{
        require(rewardPool >= amount,"Do not have enought reward in pool");
        TaikoToken.transferFrom(address(this), msg.sender, amount);
    }
}