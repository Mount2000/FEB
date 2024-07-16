const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const nodeContractAddress = "0x67dB0283eF2b7468723FB625cA2E63b0a27e0a9D";
  const tokenContractAddress = "0xE4614910b2AC003866774b4ae9c2e308748d5270";
  const nodeManagerContractAddress = "0x57004c66ccE0Cd1045C642db1E2A7543B20A2477";
  const StorageContract = await ethers.getContractFactory("Staking");
  const storageContract = await StorageContract.deploy(
    nodeContractAddress,
    tokenContractAddress,
    nodeManagerContractAddress,
  );

  await storageContract.waitForDeployment();
  const tx = await storageContract.deploymentTransaction();

  console.log("Contract deployed successfully.");
  console.log(`Deployer: ${storageContract.runner.address}`);
  console.log(`Deployed to: ${storageContract.target}`);
  console.log(`Transaction hash: ${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });