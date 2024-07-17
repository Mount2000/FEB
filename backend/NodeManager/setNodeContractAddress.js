require('dotenv').config();
const ethers = require('ethers');
const contractABI = require('../artifacts/NodeManager.json'); 
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0xD5C306E88B936dA1c3B581Ac33B324BA4C20b9cf';

const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function writeContract() {
    console.log('Calling setNodeContractAddress function...');
    const bachiNodeContractAddress = '0xed1ed62D748c352F3D0f72A4B1C10E5Ca7a4c2D9'; 
    const transactionResponse = await contract.setNodeContractAddress(bachiNodeContractAddress);
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
}

(async () => {
    await writeContract();
})().catch(console.error);
