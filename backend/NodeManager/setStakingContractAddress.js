require('dotenv').config();
const ethers = require('ethers');
const contractABI = require('../artifacts/NodeManager.json'); // Update with the correct ABI for NodeManager
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0xD5C306E88B936dA1c3B581Ac33B324BA4C20b9cf';

const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function writeContract() {
    console.log('Calling setStakingContractAddress function...');
    const stakingContractAddress = '0x467Fc96aCD06b2E9EDf47a339aa6b08e89F02bC6'; // Replace with the address of your Staking contract
    const transactionResponse = await contract.setStakingContractAddress(stakingContractAddress);
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
}

(async () => {
    await writeContract();
})().catch(console.error);
