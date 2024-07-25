require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers');
const contractABI = require('../artifacts/NodeManager.json');
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0xD5C306E88B936dA1c3B581Ac33B324BA4C20b9cf';

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const contractWithSigner = contract.connect(signer);

async function writeContract() {
    console.log('Calling updateNodeTier function...');
    const _nodeTierId = 1; 
    const name = "Updated NodeTier";
    const status = true;
    const price = 150;
    const hashrate = 12;
    const farmSpeed = 1200;
    const referralRate = 5;

    const transactionResponse = await contractWithSigner.updateNodeTier(
        _nodeTierId,
        name,
        status,
        price,
        hashrate,
        farmSpeed,
        referralRate
    );
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
}

(async () => {
    await writeContract();
})().catch(console.error);
