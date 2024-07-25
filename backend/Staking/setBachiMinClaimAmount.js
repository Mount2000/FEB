require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers');
const contractABI = require('../artifacts/Staking.json'); 
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0x8130D1d5D6Eb2C98741E3E73076D53c1356491a4';

const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function writeContract() {
    console.log('Calling setBachiMinClaimAmount function...');
    const bachiMinClaimAmount = ethers.parseUnits('10', 'wei'); 
    const transactionResponse = await contract.setBachiMinClaimAmount(bachiMinClaimAmount);
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
}

(async () => {
    await writeContract();
})().catch(console.error);
