import { expect } from 'chai';
import dotenv from 'dotenv';
import { ethers } from 'hardhat';

import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

import { Todos } from '../typechain-types';
import { parseTodo } from './utils';

dotenv.config()

describe("Todos addition test", () => {
	let todos: Todos;
	let owner: HardhatEthersSigner; 
	let anotherOwner: HardhatEthersSigner;
	
	before(async ()=> {
		[owner, anotherOwner] = await ethers.getSigners();
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
				owner: await owner.getAddress()
			}

			expect(parseTodo(tasks[0])).to.deep.equal(expected);
		});
	});

	describe("Add task with another user", ()=> {
		it("also adds task", async ()=> {
			todos = todos.connect(anotherOwner);
			let tx = await todos.addTask("This is also task 1");
			let res = await tx.wait();
			let tasks = await todos.getTasks();
			// console.log(tasks.map(task => parseTodo(task)));

			expect(tasks.length).to.equal(1);

			const expected = {
				id: 1n,
				task: "This is also task 1",
				completed: false,
				owner: await anotherOwner.getAddress()
			}

			expect(parseTodo(tasks[0])).to.deep.equal(expected);
		})
	})
});
