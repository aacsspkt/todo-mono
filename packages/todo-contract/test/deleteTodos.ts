import { expect } from 'chai';
import { ethers } from 'hardhat';

import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

import { Todos } from '../typechain-types';
import { parseTodo } from './utils';

describe("Todos deletion test", () => {
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

			tx = await todos.addTask("This is task 2");
			res = await tx.wait();

			tx = await todos.addTask("This is task 3");
			res = await tx.wait();

			tx = await todos.addTask("This is task 4");
			res = await tx.wait();

			let tasks = await todos.getTasks();
			// console.log(tasks.map(task => parseTodo(task)));

			expect(tasks.length).to.equal(4);

			const expected = [
				{
					task: "This is task 1",
					completed: false,
				},
				{
					task: "This is task 2",
					completed: false,
				},
				{
					task: "This is task 3",
					completed: false,
				},
				{
					task: "This is task 4",
					completed: false,
				},
			];

			expect(tasks.map(task => parseTodo(task))).to.deep.equal(expected);
		});
	});

	describe("Delete task", () => {
		it("deletes task", async () => {
			const index = 0n;
			let tx = await todos.deleteTask(index);
			let res = await tx.wait();
			let tasks = await todos.getTasks();

			expect(tasks.length).to.equal(3);

			const expected = [
				{
					task: "This is task 2",
					completed: false,
				},
				{
					task: "This is task 3",
					completed: false,
				},
				{
					task: "This is task 4",
					completed: false,
				},
			];

			expect(tasks.map(task => parseTodo(task))).to.deep.equal(expected);
		});
	});
});
