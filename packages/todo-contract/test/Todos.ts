import dotenv from 'dotenv';
import { ethers } from 'hardhat';

import { Todos } from '../typechain-types';

dotenv.config()

describe("Todos", () => {
	let todos: Todos;
	
	describe("Add tasks", () => {
		it("adds task", async () => {
			const [owner] = await ethers.getSigners()
			console.log(await owner.getAddress())
			const Todos = await ethers.getContractFactory("Todos");
			todos = await Todos.connect(owner).deploy();
			const tx = await todos.addTask("This is task 1");
			console.log(tx);

			const res = await tx.wait();
			console.log(res);
		});
	});
});
