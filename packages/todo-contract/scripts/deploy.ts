import * as fs from 'fs';
import { ethers } from 'hardhat';

async function main() { 
  const todos = await ethers.deployContract("Todos");
  await todos.waitForDeployment();

  console.log("Todo contract deployed at:", todos.target);

  fs.writeFileSync("contract.json", JSON.stringify({ contract: todos.target }));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
