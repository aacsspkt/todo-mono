import { expect } from 'chai';
import { ethers } from 'hardhat';

import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

import { Todos } from '../typechain-types';
import { parseTodo } from './utils';

describe("Todos updation test", () => {
	let todos: Todos;
	let owner: HardhatEthersSigner;

	before(async () => {
		[owner] = await ethers.getSigners();
		// console.log("owner:", await owner.getAddress());
		// console.log("another owner:", await anotherOwner.getAddress());
		// console.log("\n");

		const Todos = await ethers.getContractFactory("Todos");
		todos = await Todos.connect(owner).deploy();
	});

	describe("Add task", () => {
		it("adds task", async () => {
			let tx = await todos.addTask("This is task 1");
			let res = await tx.wait();
			let tasks = await todos.getTasks();
			// console.log(tasks.map(task => parseTodo(task)));

			expect(tasks.length).to.equal(1);

			const expected = {
				id: 0n,
				task: "This is task 1",
				completed: false,
				owner: await owner.getAddress(),
			};

			expect(parseTodo(tasks[0])).to.deep.equal(expected);
		});
	});

    describe("Update task", ()=> {
        it("updates task", async ()=> {
            let tx = await todos.updateTask(0n, "Actually this is task 2");
			let res = await tx.wait();
			let tasks = await todos.getTasks();
            // console.log("tasks", tasks);
            // console.log("\n");

            expect(tasks.length).to.equal(1);

			const expected = {
				id: 0n,
				task: "Actually this is task 2",
				completed: false,
				owner: await owner.getAddress(),
			};

			expect(parseTodo(tasks[0])).to.deep.equal(expected);
        })

        it("toggle completed", async ()=> {
            let tx = await todos.toggleCompleted(0n);
			let res = await tx.wait();
			let tasks = await todos.getTasks();

            expect(tasks.length).to.equal(1);

			const expected = {
				id: 0n,
				task: "Actually this is task 2",
				completed: true,
				owner: await owner.getAddress(),
			};

			expect(parseTodo(tasks[0])).to.deep.equal(expected);
        })
    })
});
