const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const BachiNode = await ethers.getContractFactory("BachiNode");
    const bachiNode = await BachiNode.deploy("BachiNode", "BN");
    await bachiNode.waitForDeployment();
    const tx = await bachiNode.deploymentTransaction();

    console.log("Contract deployed successfully.");
    console.log(`Deployed to: ${bachiNode.target}`);
    console.log(`Transaction hash: ${tx.hash}`);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
