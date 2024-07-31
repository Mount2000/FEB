require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers');
const contractABI = require('../artifacts/Staking.json'); 
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0x26ccE02f1Ad2036b281fea67450F1c7DFE3599f2';

const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function writeContract() {
    console.log('Calling setTaikoMinClaimAmount function...');
    const taikoMinClaimAmount = ethers.parseUnits('20', 'wei'); 
    const transactionResponse = await contract.setTaikoMinClaimAmount(taikoMinClaimAmount);
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
}

(async () => {
    await writeContract();
})().catch(console.error);
