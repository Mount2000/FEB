require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers');
const contractABI = require('../artifacts/NodeManager.json');
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0xbe338e34367CDD5677F85FC98121A827968cC501';

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const contractWithSigner = contract.connect(signer);

async function writeContract() {
    console.log('Calling withdraw function...');
    const to = '0x2D2906fFB44E67bF29ab9bd6F000A37c107dA962'; 
    const value = ethers.parseEther('0.0000000000000001'); 

    const transactionResponse = await contractWithSigner.withdraw(to, value);
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
}

;(async () => {
    await writeContract();
})().catch(console.error);
