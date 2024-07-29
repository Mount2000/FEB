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

async function writeContract() {
    console.log('Calling addNodeTier function...');
    const name = "BachiNFT";
    const price = 100;
    const hashrate = 10;
    const farmSpeedBachi = 1000;
    const farmSpeedTaiko = 500;
    const referralRate = 3;

    const transactionResponse = await contractWithSigner.addNodeTier(
        name,
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
    await writeContract();
})().catch(console.error);

provider.on("block", async (blockNumber) => {
    console.log(`Block number: ${blockNumber}`);

    const events = await contract.queryFilter("AddedNode", blockNumber - 1, blockNumber);

    for (const event of events) {
        const { args } = event;

        if (processedTransactionHashes.has(event.transactionHash)) {
            continue;
        }

        console.log('Event AddedNode emitted:', {
            sender: args[0],
            nodeTierId: args[1].toString(), 
            status: args[2],
            name: args[3],
            price: args[4],
            hashrate: args[5],
            farmSpeedBachi: args[6],
            farmSpeedTaiko: args[7],
            referralRate: args[8],
            transactionHash: event.transactionHash
        });

        const existingRecord = await NodeTier.findOne({ nodeTierId: args[1].toString() }); 
        if (!existingRecord) {
            const nodeTier = new NodeTier({
                sender: args[0],
                nodeTierId: Number(args[1].toString()), 
                status: args[2],
                name: args[3],
                price: Number(args[4]),
                hashrate: Number(args[5]),
                farmSpeedBachi: Number(args[6]),
                farmSpeedTaiko: Number(args[7]),
                referralRate: Number(args[8]),
                transactionHash: event.transactionHash
            });

            await nodeTier.save();
            console.log("NodeTier data saved to MongoDB successfully!");
        }

        processedTransactionHashes.add(event.transactionHash);
    }
});
