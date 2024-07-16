const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  const nodeContractAddress = "0x67dB0283eF2b7468723FB625cA2E63b0a27e0a9D";
  const tokenContractAddress = "0xE4614910b2AC003866774b4ae9c2e308748d5270";
  const nodeManagerContractAddress = "0x57004c66ccE0Cd1045C642db1E2A7543B20A2477";
  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(
    nodeContractAddress,
    tokenContractAddress,
    nodeManagerContractAddress,
  );

  await staking.waitForDeployment();
  const tx = await staking.deploymentTransaction();

  console.log("Contract deployed successfully.");
  console.log(`Deployer: ${staking.runner.address}`);
  console.log(`Deployed to: ${staking.target}`);
  console.log(`Transaction hash: ${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });