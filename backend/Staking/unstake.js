require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers');
const contractABI = require('../artifacts/Staking.json'); 
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0x5cdC930B26015194B4A84e22d0E6bB4DF09be8b6';

const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function unstakeNode(_stakeId) {
    try {
        console.log(`unStaking with stake ID: ${_stakeId}`);
        const transactionResponse = await contract.unstake(_stakeId);
        await transactionResponse.wait();
        console.log(`Transaction hash: ${transactionResponse.hash}`);
    } catch (error) {
        console.error(`Error staking node: ${error}`);
    }
}

;(async () => {
    const _stakeId = 4; 
    await unstakeNode(_stakeId);
})().catch(console.error);
