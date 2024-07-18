require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { ethers } = require('ethers');
const contractABI = require('../artifacts/Staking.json');
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0xEA591482E3Bc305884CDbEc4533919dFB9E58A25';
const contract = new ethers.Contract(contractAddress, contractABI, signer);
const cron = require('node-cron');
let currentNodeTierId = 10;
cron.schedule(
    '00 48 14 * * *',
    async function () {
        console.log('Stake NFT...');
        try {
            const tx = await contract.stake(currentNodeTierId);
            console.log(`Transaction sent: ${tx.hash}`);

            currentNodeTierId++;
        } catch (error) {
            console.error(`Error staking node: ${error}`);
        }
    },
    {
        scheduled: true,
        timezone: 'Asia/Ho_Chi_Minh'
    }
);
