// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

contract Todos {
    struct Task {
        uint256 id;
        string task;
        bool completed;
        address owner;
    }


    // Task[] private tasks;
    mapping (address => Task[]) tasks;
    uint256 count;


    event TaskCreated(uint256 id, string task, bool completed, address owner);
    event TaskUpdated(uint256 id, string task, bool completed, address owner);
    event TaskToggleCompleted(uint256 id, string task, bool completed, address owner);
    event TaskDeleted(uint id);

    function addTask(string calldata _task) external {
        address owner = msg.sender;
        Task memory task = Task({id: count, task: _task, completed: false, owner: msg.sender});
        tasks[owner].push(task);

        emit TaskCreated(count, task.task, task.completed, owner);

        count += 1;
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

    function updateTask(uint _index, string calldata _task) external {
        address owner = msg.sender;
        Task[] storage taskOwned = tasks[owner];

        require(_index < taskOwned.length, "Index out of bound");

        Task storage task = taskOwned[_index];
        task.task = _task;

        emit TaskUpdated(task.id, task.task, task.completed, owner);
    }

    function toggleCompleted(uint _index) external {
        address owner = msg.sender;
        Task[] storage taskOwned = tasks[owner];

        require(_index < taskOwned.length, "Index out of bound");
        
        Task storage task = taskOwned[_index];
        task.completed = !task.completed;

        emit TaskToggleCompleted(task.id, task.task, task.completed, owner);
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