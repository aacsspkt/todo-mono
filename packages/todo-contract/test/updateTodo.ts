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
				task: "This is task 1",
				completed: false,
			};

			expect(parseTodo(tasks[0])).to.deep.equal(expected);
		});
	});

    describe("Update task", ()=> {

        it("toggle completed", async ()=> {
			const index = 0n;
            let tx = await todos.toggleCompleted(index);
			let res = await tx.wait();
			let tasks = await todos.getTasks();

            expect(tasks.length).to.equal(1);

			const expected = {
				task: "This is task 1",
				completed: true,
			};

			expect(parseTodo(tasks[0])).to.deep.equal(expected);
        })
    })
});
