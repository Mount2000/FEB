const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Addresses of the contracts you want to interact with
  const nodeContractAddress = "0x67dB0283eF2b7468723FB625cA2E63b0a27e0a9D";
  const tokenContractAddress = "0xE4614910b2AC003866774b4ae9c2e308748d5270";
  const nodeManagerContractAddress = "0x57004c66ccE0Cd1045C642db1E2A7543B20A2477";

  // Deploy NodeManager contract
  const NodeManager = await ethers.getContractFactory("NodeManager");
  const nodeManager = await NodeManager.deploy(
    nodeContractAddress,
    tokenContractAddress,
    nodeManagerContractAddress,
  );
  await nodeManager.waitForDeployment();
  const nodeManagerTx = await nodeManager.deploymentTransaction();
  console.log("NodeManager deployed successfully.");
  console.log(`Deployer: ${nodeManager.runner.address}`);
  console.log(`Deployed to: ${nodeManager.target}`);
  console.log(`Transaction hash: ${nodeManagerTx.hash}`);

  // Deploy Staking contract
  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(
    nodeContractAddress,
    tokenContractAddress,
    nodeManagerContractAddress,
  );
  await staking.waitForDeployment();
  const stakingTx = await staking.deploymentTransaction();
  console.log("Staking deployed successfully.");
  console.log(`Deployed to: ${staking.target}`);
  console.log(`Transaction hash: ${stakingTx.hash}`);

  // Deploy BachiToken contract
  const tokenName = "BACHI TOKEN";
  const tokenSymbol = "BACHI";
  const BachiToken = await ethers.getContractFactory("BachiToken");
  const bachiToken = await BachiToken.deploy(tokenName, tokenSymbol);
  await bachiToken.waitForDeployment();
  const bachiTokenTx = await bachiToken.deploymentTransaction();
  console.log("BachiToken deployed successfully.");
  console.log(`Deployed to: ${bachiToken.target}`);
  console.log(`Transaction hash: ${bachiTokenTx.hash}`);

  // Deploy BachiNode contract
  const BachiNode = await ethers.getContractFactory("BachiNode");
  const bachiNode = await BachiNode.deploy(tokenName, tokenSymbol, nodeManagerContractAddress);
  await bachiNode.waitForDeployment();
  const bachiNodeTx = await bachiNode.deploymentTransaction();
  console.log("BachiNode deployed successfully.");
  console.log(`Deployed to: ${bachiNode.target}`);
  console.log(`Transaction hash: ${bachiNodeTx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
