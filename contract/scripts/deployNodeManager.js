const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const BachiNode = await ethers.getContractFactory("NodeManager");
    const bachiNode = await BachiNode.deploy("0x9fEE89C94237F9507E3D2BE603788db6747eC90C", "10");
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
