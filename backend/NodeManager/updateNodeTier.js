require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers');
const contractABI = require('../artifacts/NodeManager.json'); 
const { NodeTier } = require('../database');
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0x3e42ac96BE68f0401307F350b090270Ec01ab44b'; 

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const contractWithSigner = contract.connect(signer);

let processedTransactionHashes = new Set();

async function updateNodeTier() {
    console.log('Calling updateNodeTier function...');
    const nodeTierId = 30; 
    const name = "Updated Node"; 
    const status = true; 
    const price = 20; 
    const hashrate = 50; 
    const farmSpeedBachi = 30; 
    const farmSpeedTaiko = 200; 
    const referralRate = 10;

    const transactionResponse = await contractWithSigner.updateNodeTier(
        nodeTierId,
        name,
        status,
        price,
        hashrate,
        farmSpeedBachi,
        farmSpeedTaiko,
        referralRate
    );
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
};

(async () => {
    await updateNodeTier();
})().catch(console.error);

provider.on("block", async (blockNumber) => {
    console.log(`Block number: ${blockNumber}`);
    const events = await contract.queryFilter("UpdatedNode", blockNumber - 1, blockNumber);

    for (const event of events) {
        const { args } = event;

        if (processedTransactionHashes.has(event.transactionHash)) {
            continue;
        }

        console.log('Event UpdatedNode emitted:', {
            sender: args[0],
            nodeTierId: Number(args[1]),  
            status: args[2],
            name: args[3],
            price: Number(args[4]),
            hashrate: Number(args[5]),
            farmSpeedBachi: Number(args[6]),
            farmSpeedTaiko: Number(args[7]),
            referralRate: Number(args[8]),
            transactionHash: event.transactionHash
        });

        const existingRecord = await NodeTier.findOne({ nodeTierId: Number(args[1]) });

        if (existingRecord) {
            existingRecord.status = args[2];
            existingRecord.name = args[3];
            existingRecord.price = Number(args[4]);
            existingRecord.hashrate = Number(args[5]);
            existingRecord.farmSpeedBachi = Number(args[6]);
            existingRecord.farmSpeedTaiko = Number(args[7]);
            existingRecord.referralRate = Number(args[8]);
            existingRecord.transactionHash = event.transactionHash;

            await existingRecord.save();
            console.log("NodeTier data updated in MongoDB successfully!");
        } else {
            console.log(`NodeTier with ID ${args[1]} does not exist in MongoDB.`);
        }

        processedTransactionHashes.add(event.transactionHash);
    }
});
