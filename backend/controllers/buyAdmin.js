require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers');
const { Sale } = require('../models/sale'); 

const contractABI = require('../artifacts/NodeManager.json');

const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractAddress = '0x3e42ac96BE68f0401307F350b090270Ec01ab44b';
const contract = new ethers.Contract(contractAddress, contractABI, signer);

let processedTransactionHashes = new Set();

async function writeContract() {
    console.log('is granting nft to user...');
    
    const nodeTierId = 3; 
    const nodeOwner = '0x3C83Af440750e452fBaC4CA25A156071e7a34aD9'; 
    const metadata = 'Node metadata'; 
    
    const transactionResponse = await contract.buyAdmin(
        nodeTierId,
        nodeOwner,
        metadata
    );
    
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
}

(async () => {
    await writeContract();
})().catch(console.error);

provider.on("block", async (blockNumber) => {
    console.log(`Block number: ${blockNumber}`);
    const events = await contract.queryFilter("Sale", blockNumber - 1, blockNumber);

    for (const event of events) {
        const { args } = event;

        if (processedTransactionHashes.has(event.transactionHash)) {
            continue;
        }

        console.log('Event Sale emitted:', {
            nodeOwner: args[0],
            nodeTierId: Number(args[1]),
            transactionHash: event.transactionHash
        });

        const sale = new Sale({
            nodeOwner: args[0],
            nodeTierId: Number(args[1]),
            transactionHash: event.transactionHash 
        });

        await sale.save();
        console.log("Sale data saved to MongoDB successfully!");

        processedTransactionHashes.add(event.transactionHash);
    }
});
