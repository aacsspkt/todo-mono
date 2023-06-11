// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

contract Todos {
    struct Task {
        uint id;
        string task;
        bool completed;
        address owner;
    }

    Task[] private tasks;

    event TaskCreated(uint id, string task, bool completed);
    event TaskUpdated(uint id, string task, bool completed);
    event TaskToggleCompleted(uint id, string task, bool completed);
    event TaskDeleted(uint id);

    function addTask(string calldata _task) external {
        uint taskId = tasks.length;

        Task memory task = Task({ id: taskId, task: _task, completed: false, owner: msg.sender});
        tasks.push(task);

        emit TaskCreated(task.id, task.task, task.completed);
    }

    function getTasks() external view returns (Task[] memory result) {
        Task[] memory temp = new Task[](tasks.length);
        uint counter = 0;
        
        for(uint i = 0; i<tasks.length; i++){
            if (tasks[i].owner == msg.sender) {
                temp[counter] = tasks[i];
                counter++;
            }
        }

        result = new Task[](counter);
        for (uint i=0; i<counter; i++) {
            result[i] = temp[i];
        }
    }

    function getTask(uint _index) external view returns (Task memory task) {
        require(tasks[_index].owner == msg.sender, "Unauthorized owner");
        
        task = tasks[_index];
    }

    function updateTask(uint _index, string calldata _task) external {
        require(tasks[_index].owner == msg.sender, "Unauthorized owner");
        
        Task memory task = tasks[_index];
        task.task = _task;

        emit TaskUpdated(task.id, task.task, task.completed);
    }

    function toggleCompleted(uint _index) external {
        require(tasks[_index].owner == msg.sender, "Unauthorized owner");
        
        Task memory task = tasks[_index];
        task.completed = !task.completed;

        emit TaskToggleCompleted(task.id, task.task, task.completed);
    }

    function deleteTask(uint _index) external {
        require(_index < tasks.length, "Invalid index provided");
        
        for(uint i = _index; i < tasks.length-1; i++){
            tasks[i] = tasks[i+1];      
        }
        tasks.pop();
        
        emit TaskDeleted(_index);
    }
}