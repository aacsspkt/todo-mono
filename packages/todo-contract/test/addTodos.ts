import { expect } from 'chai';
import dotenv from 'dotenv';
import { ethers } from 'hardhat';

import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

import { Todos } from '../typechain-types';
import { parseTodo } from './utils';

dotenv.config();

describe("Todos addition test", () => {
	let todos: Todos;
	let owner: HardhatEthersSigner;
	let anotherOwner: HardhatEthersSigner;

	before(async () => {
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
				task: "This is task 1",
				completed: false,
			};

			expect(parseTodo(tasks[0])).to.deep.equal(expected);
		});
	});

	describe("Add task with another user", () => {
		it("also adds task", async () => {
			todos = todos.connect(anotherOwner);
			let tx = await todos.addTask("This is also task 1");
			let res = await tx.wait();
			let tx1 = await todos.addTask("This is also task 2");
			let res1 = await tx1.wait();
			let tx2 = await todos.addTask("This is also task 3");
			let res2 = await tx2.wait();
			let tasks = await todos.getTasks();
			console.log(tasks.map((task) => parseTodo(task)));

			expect(tasks.length).to.equal(3);

			const expected = [
				{
					task: "This is also task 1",
					completed: false,
				},
				{
					task: "This is also task 2",
					completed: false,
				},
				{
					task: "This is also task 3",
					completed: false,
				},
			];

			expect(parseTodo(tasks[0])).to.deep.equal(expected[0]);
			expect(parseTodo(tasks[1])).to.deep.equal(expected[1]);
			expect(parseTodo(tasks[2])).to.deep.equal(expected[2]);
		});
	});
});
