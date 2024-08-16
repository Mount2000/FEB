const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  let taikoTokenAddress = "0x2029Ca1e4A5954781a271d6Fa3598bF4434969f5";

  // Approve Taiko Token
  const TaikoToken = await ethers.getContractAt("IERC20", taikoTokenAddress);
  const amountToApprove = 100000; 
  const spenderAddress = "0x488F347535F0f4BFBe3579BC3D283fB861eCAD54"; 

  console.log(`Approving ${spenderAddress} to spend ${amountToApprove.toString()} Taiko tokens`);
  const tx = await TaikoToken.approve(spenderAddress, amountToApprove);
  await tx.wait();
  console.log(`Approval transaction hash: ${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
