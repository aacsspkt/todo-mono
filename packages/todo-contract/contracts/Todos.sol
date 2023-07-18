// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

contract Todos {
    struct Task {
        string task;
        bool completed;
    }


    // Task[] private tasks;
    mapping (address => Task[]) tasks;

    event TaskCreated(uint256 id, string task, bool completed, address owner);
    event TaskToggleCompleted(uint256 id, string task, bool completed, address owner);
    event TaskDeleted(uint256 id);

    function addTask(string calldata _task) external {
        address owner = msg.sender;
        Task memory task = Task({task: _task, completed: false});
        uint256 index = tasks[owner].length;
        
        tasks[owner].push(task);

        emit TaskCreated(index, task.task, task.completed, owner);
    }

    function getTasks() external view returns (Task[] memory result) {
        result = tasks[msg.sender]; 
    }

    function getTask(uint _index) external view returns (Task memory task) {
        address owner = msg.sender;
        Task[] memory taskOwned = tasks[owner];

        require(_index < taskOwned.length, "Index out of bound");
        
        task = taskOwned[_index];
    }

    function toggleCompleted(uint _index) external {
        address owner = msg.sender;
        Task[] storage taskOwned = tasks[owner];

        require(_index < taskOwned.length, "Index out of bound");
        
        Task storage task = taskOwned[_index];
        task.completed = !task.completed;

        emit TaskToggleCompleted(_index, task.task, task.completed, owner);
    }

    function deleteTask(uint _index) external {
        address owner = msg.sender;
        Task[] storage taskOwned = tasks[owner];

        require(_index < taskOwned.length, "Index out of bound");
        
        for(uint i = _index; i < taskOwned.length-1; i++){
            taskOwned[i] = taskOwned[i+1];      
        }
        taskOwned.pop();
        
        emit TaskDeleted(_index);
    }
}