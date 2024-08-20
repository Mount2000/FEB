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

    function setIsClaimed(address user) public onlyOwner{
        require(!awardStarted, "award is started");
        require(isClaimed[user], "User did not claim");
        isClaimed[user] = false;
    }

    function stake(uint _amount) public whenNotPaused{
        require(!isLocked, "Stacking is not allowed yet");
        BachiToken.transferFrom(msg.sender, address(this), _amount);
        stakeBalances[msg.sender] += _amount;
        totalStaked += _amount;
        emit Stake(msg.sender, _amount);
    }

    function requestUnstake(uint _amount) public whenNotPaused{
        require(!isLocked, "Request unstacking is not allowed yet");
        require(_amount <= stakeBalances[msg.sender], "Insufficient staking balance");
        unstakeRequests[msg.sender].push(UnstakeRequest(_amount, block.timestamp));
        emit RequestUnstake(msg.sender, _amount, block.timestamp);
    }

    function cancelRequestUnstake() public{
        require(unstakeRequests[msg.sender].length != 0, "You did not request unstacking yet");
        deleteFirstRequest(msg.sender);
        emit CancelRequestUnstake(msg.sender);
    }

    function unstake() public whenNotPaused{
        uint _amount = unstakeRequests[msg.sender][0].amount;
        require(!isLocked, "Unstacking is not allowed yet");
        require(unstakeRequests[msg.sender].length != 0, "You did not request unstacking yet");
        require(unstakeRequests[msg.sender][0].requestTime + limitUnstakeTime >= block.timestamp, "Unstaking is not allowed yet");
        BachiToken.transferFrom(address(this), msg.sender, _amount);
        totalStaked -= _amount;
        stakeBalances[msg.sender] -= _amount;
        deleteFirstRequest(msg.sender);
        emit Unstake(msg.sender, _amount);
    }

    function claimReward(address user) public whenNotPaused onlyRole(ADMIN_ROLE){
        uint reward = rewardPool * stakeBalances[user] / totalStaked ;
        require(awardStarted, "award is not started");
        require(reward != 0,"User is not staker");
        require(isLocked, "Claiming reward is not allowed yet");
        require(!isClaimed[user], "User already claimed");
        require(reward <= rewardPool, "Do not have enought reward in pool");
        rewardPool -= reward;
        TaikoToken.transferFrom(address(this), user, reward);
        isClaimed[user] = true;
        emit ClaimReward(user, reward);
    }

    function addRewardPool(uint amount) public onlyOwner{
        require(TaikoToken.balanceOf(msg.sender) >= amount, "Insufficient balance");
        TaikoToken.transferFrom(msg.sender, address(this), amount);
        rewardPool += amount;
    }

    function withdrawRewardPool(uint amount) public onlyOwner{
        require(rewardPool >= amount,"Do not have enought reward in pool");
        TaikoToken.transferFrom(address(this), msg.sender, amount);
    }

    function deleteFirstRequest(address user) internal {
        uint requestLength = unstakeRequests[user].length;
        for (uint i = 0; i < requestLength - 1; i++){
            unstakeRequests[user][i] = unstakeRequests[user][i+1];
        }
        unstakeRequests[user].pop();
{

}    }
}