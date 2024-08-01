require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers');
const contractABI = require('../artifacts/NodeManager.json');
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0xD8666c3E15bFB02FFD37c0377dC2e4965EcdA70d';

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const contractWithSigner = contract.connect(signer);

async function writeContract() {
    console.log('withdrawing money from the contract...');
    const to = '0x2D2906fFB44E67bF29ab9bd6F000A37c107dA962'; 
    const value = ethers.parseEther('0.000000000000000087'); 

    const transactionResponse = await contractWithSigner.withdraw(to, value);
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
}

;(async () => {
    await writeContract();
})().catch(console.error);
