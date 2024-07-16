const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const tokenName = "BACHI NFT";
    const tokenSymbol = "BACHI";
    const nodeManagerAddress = "0xeD29e1051Bdf76443311a9cFE2434198F6b4BfB3";
    const BachiNode = await ethers.getContractFactory("BachiNode");
    const bachiNode = await BachiNode.deploy(tokenName, tokenSymbol, nodeManagerAddress);
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