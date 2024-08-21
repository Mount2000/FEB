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
    mapping(address => UnstakeRequest []) public unstakeRequests; // store request unstake is pending
    mapping(address => bool) public isClaimed; // User only can claim once per cycle, true if user claimed in current cycle
    uint public rewardPool;
    uint public totalStaked;
    uint public limitUnstakeTime; // the delay time to unstake after request unstake
    bool public isLocked; // allow stake and unstake when locked is false and allow claim when locked is true
    bool public awardStarted;

    event Stake(address indexed user, uint amount, uint timeStake);
    event RequestUnstake(address indexed user, uint amount, uint timeRequest);
    event CancelRequestUnstake(address indexed user, uint amount, uint timeCancel);
    event Unstake(address indexed user, uint amount, uint timeUnstake);
    event ClaimReward(address indexed user, uint amount, uint timeClaim);

    modifier onlyLoked(){
        require(isLocked, "Contract is not locked");
        _;
    }

    modifier onlyNotLoked(){
        require(!isLocked, "Contract is locked");
        _;
    }

    constructor(uint _limitUnstakeTime, IERC20 _BachiToken, IERC20 _TaikoToken){
        limitUnstakeTime = _limitUnstakeTime;
        BachiToken = _BachiToken;
        TaikoToken = _TaikoToken;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
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

    function setIsClaimed(address user) public onlyOwner{
        require(!awardStarted, "award is started");
        require(isClaimed[user], "User did not claim");
        isClaimed[user] = false;
    }

    function stake(uint _amount) public whenNotPaused onlyNotLoked{
        require(BachiToken.balanceOf(msg.sender) >= _amount, "Insufficient balance");
        require(BachiToken.allowance(msg.sender, address(this)) >= _amount, "Insufficient allowance");
        BachiToken.transferFrom(msg.sender, address(this), _amount);
        stakeBalances[msg.sender] += _amount;
        totalStaked += _amount;
        emit Stake(msg.sender, _amount, block.timestamp);
    }

    function requestUnstake(uint _amount) public whenNotPaused onlyNotLoked{
        require(_amount <= stakeBalances[msg.sender], "Insufficient staking balance");
        totalStaked -= _amount;
        stakeBalances[msg.sender] -= _amount;
        unstakeRequests[msg.sender].push(UnstakeRequest(_amount, block.timestamp));
        emit RequestUnstake(msg.sender, _amount, block.timestamp);
    }

    function cancelRequestUnstake(uint requestId) public whenNotPaused onlyNotLoked{
        uint _amount = unstakeRequests[msg.sender][requestId].amount;
        totalStaked += _amount;
        stakeBalances[msg.sender] += _amount;
        deleteRequest(msg.sender, requestId);
        emit CancelRequestUnstake(msg.sender, _amount, block.timestamp);
    }

    function unstake(uint requestId) public whenNotPaused onlyNotLoked{
        uint _amount = unstakeRequests[msg.sender][requestId].amount;
        require(unstakeRequests[msg.sender][requestId].requestTime + limitUnstakeTime >= block.timestamp, "Unstaking is not allowed yet");
        BachiToken.transferFrom(address(this), msg.sender, _amount);
        deleteRequest(msg.sender, requestId);
        emit Unstake(msg.sender, _amount, block.timestamp);
    }

    function claimReward(address user) public whenNotPaused onlyRole(ADMIN_ROLE) onlyLoked{
        uint reward = rewardPool * stakeBalances[user] / totalStaked ;
        require(awardStarted, "award is not started");
        require(reward != 0,"User is not staker");
        require(!isClaimed[user], "User already claimed");
        require(reward <= rewardPool, "Do not have enought reward in pool");
        rewardPool -= reward;
        TaikoToken.transferFrom(address(this), user, reward);
        isClaimed[user] = true;
        emit ClaimReward(user, reward, block.timestamp);
    }

    function addRewardPool(uint amount) public onlyOwner{
        require(TaikoToken.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");
        require(TaikoToken.balanceOf(msg.sender) >= amount, "Insufficient balance");
        TaikoToken.transferFrom(msg.sender, address(this), amount);
        rewardPool += amount;
    }

    function withdrawRewardPool(uint amount) public onlyOwner{
        require(rewardPool >= amount,"Do not have enought reward in pool");
        TaikoToken.transferFrom(address(this), msg.sender, amount);
    }

    function deleteRequest(address user, uint requestId) internal {
        uint requestLength = unstakeRequests[user].length;
        require(unstakeRequests[user].length > requestId, "Not exist request ID");
        for (uint i = requestId; i < requestLength - 1; i++){
            unstakeRequests[user][i] = unstakeRequests[user][i+1];
        }
        unstakeRequests[user].pop();
    }
}