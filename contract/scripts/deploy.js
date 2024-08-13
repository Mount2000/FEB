const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  let bachiTokenAddress = "0x0000000000000000000000000000000000000000";
  let bachiNodeAddress = "0x0000000000000000000000000000000000000000";
  let nodeManagerAddress = "0x0000000000000000000000000000000000000000";
  let stakingAddress = "0x0000000000000000000000000000000000000000";
  let questManagerAddress = "0x0000000000000000000000000000000000000000";

  // Deploy BachiToken contract
  let tokenName = "BACHI TOKEN";
  const tokenSymbol = "BACHI";
  const BachiToken = await ethers.getContractFactory("BachiToken");
  const bachiToken = await BachiToken.deploy(tokenName, tokenSymbol);
  await bachiToken.waitForDeployment();
  const bachiTokenTx = await bachiToken.deploymentTransaction();
  bachiTokenAddress = bachiToken.target;
  console.log("BachiToken deployed successfully.");
  console.log(`Deployed to: ${bachiTokenAddress}`);
  console.log(`Transaction hash: ${bachiTokenTx.hash}`);

  // Deploy BachiNode contract
  tokenName = "BACHI NODE";
  const BachiNode = await ethers.getContractFactory("BachiNode");
  const bachiNode = await BachiNode.deploy(
    tokenName,
    tokenSymbol,
    nodeManagerAddress
  );
  await bachiNode.waitForDeployment();
  const bachiNodeTx = await bachiNode.deploymentTransaction();
  bachiNodeAddress = bachiNode.target;
  console.log("BachiNode deployed successfully.");
  console.log(`Deployed to: ${bachiNodeAddress}`);
  console.log(`Transaction hash: ${bachiNodeTx.hash}`);

  // Deploy NodeManager contract
  const NodeManager = await ethers.getContractFactory("NodeManager");
  const nodeManager = await NodeManager.deploy(
    bachiNodeAddress,
    bachiTokenAddress,
    stakingAddress
  );
  await nodeManager.waitForDeployment();
  const nodeManagerTx = await nodeManager.deploymentTransaction();
  nodeManagerAddress = nodeManager.target;
  console.log("NodeManager deployed successfully.");
  console.log(`Deployed to: ${nodeManagerAddress}`);
  console.log(`Transaction hash: ${nodeManagerTx.hash}`);

  // Deploy Staking contract
  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(
    bachiNodeAddress,
    bachiTokenAddress,
    nodeManagerAddress
  );
  await staking.waitForDeployment();
  const stakingTx = await staking.deploymentTransaction();
  stakingAddress = staking.target;
  console.log("Staking deployed successfully.");
  console.log(`Deployed to: ${stakingAddress}`);
  console.log(`Transaction hash: ${stakingTx.hash}`);

  // Deploy Quest manager contract
  const QuestManager = await ethers.getContractFactory("QuestManager");
  const questManager = await QuestManager.deploy(stakingAddress);
  await questManager.waitForDeployment();
  const questManagerTx = await questManager.deploymentTransaction();
  questManagerAddress = questManager.target;
  console.log("QuestManager deployed successfully.");
  console.log(`Deployed to: ${stakingAddress}`);
  console.log(`Transaction hash: ${questManagerTx.hash}`);

  /********************** CONTRACT ADDRESS **************************/

  console.log({
    bachiTokenAddress,
    bachiNodeAddress,
    nodeManagerAddress,
    stakingAddress,
    questManagerAddress
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
