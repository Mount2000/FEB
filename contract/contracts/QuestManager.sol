// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;
import "./Staking.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract QuestManager is Pausable, AccessControl, Ownable {
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableSet for EnumerableSet.AddressSet;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    Staking public stakingContract;

    uint8 public taskId;
    struct TaskInformation {
        string code;
        uint point;
    }

    mapping(uint8 => TaskInformation) public tasksInfo;
    mapping(address => EnumerableSet.UintSet) private userTasksLinks;
    mapping(uint => EnumerableSet.AddressSet) private taskUsersLinks;
    mapping(address => uint) public rewardBalances;

    // Events
    event AddedTask(address indexed user, uint taskId, string code, uint point);

    event UpdatedTask(
        address indexed user,
        uint taskId,
        string code,
        uint point
    );

    event CompleteTask(
        address indexed user,
        uint taskId,
        string code,
        uint point
    );

    constructor(address _stakingContract) Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        stakingContract = Staking(_stakingContract);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setStakingContractAddress(
        address _stakingContract
    ) public onlyRole(ADMIN_ROLE) {
        stakingContract = Staking(_stakingContract);
    }

    function addTask(
        string memory code,
        uint point
    ) public whenNotPaused onlyRole(ADMIN_ROLE) {
        require(point > 0, "Point must be greater than 0");
        require(bytes(code).length > 0, "Code name must not be empty");

        taskId++;
        TaskInformation memory newTask = TaskInformation(code, point);
        tasksInfo[taskId] = newTask;

        emit AddedTask(msg.sender, taskId, code, point);
    }

    function updateTask(
        uint8 _taskId,
        string memory code,
        uint point
    ) public whenNotPaused onlyRole(ADMIN_ROLE) {
        require(tasksInfo[_taskId].point > 0, "Task does not exist");
        require(point > 0, "Point must be greater than 0");
        require(bytes(code).length > 0, "Code name must not be empty");

        tasksInfo[_taskId].code = code;
        tasksInfo[_taskId].point = point;

        emit UpdatedTask(msg.sender, taskId, code, point);
    }

    function completeTask(uint8 _taskId) public whenNotPaused {
        address user = msg.sender;
        TaskInformation memory taskInfo = tasksInfo[_taskId];
        require(taskInfo.point > 0, "Task does not exist");
        require(
            !isUserCompletedByTask(_taskId, user) &&
                !isTaskCompletedByUser(user, _taskId),
            "Task is completed"
        );
        userTasksLinks[user].add(_taskId);
        taskUsersLinks[_taskId].add(user);
        rewardBalances[user] += taskInfo.point;

        stakingContract.updateRewardAmount(user, 0, taskInfo.point);
        emit CompleteTask(user, taskId, taskInfo.code, taskInfo.point);
    }

    function isTaskCompletedByUser(
        address user,
        uint8 _taskId
    ) public view returns (bool) {
        return userTasksLinks[user].contains(_taskId);
    }

    function totalTaskCompletedByUser(address user) public view returns (uint) {
        return userTasksLinks[user].length();
    }

    function getTaskUserCompletedByIndex(
        address user,
        uint256 index
    ) public view returns (uint) {
        require(index < userTasksLinks[user].length(), "Index out of bounds");
        return userTasksLinks[user].at(index);
    }

    function isUserCompletedByTask(
        uint _taskId,
        address user
    ) public view returns (bool) {
        return taskUsersLinks[_taskId].contains(user);
    }

    function TotalUserCompletedByTask(uint _taskId) public view returns (uint) {
        return taskUsersLinks[_taskId].length();
    }

    function getUserCompletedTaskByIndex(
        uint _taskId,
        uint256 index
    ) public view returns (address) {
        require(
            index < taskUsersLinks[_taskId].length(),
            "Index out of bounds"
        );
        return taskUsersLinks[_taskId].at(index);
    }
}
