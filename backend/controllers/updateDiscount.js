require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers');
const contractABI = require('../artifacts/NodeManager.json'); 
const { DiscountCoupon } = require('../models/coupon'); 
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0x3e42ac96BE68f0401307F350b090270Ec01ab44b'; 

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const contractWithSigner = contract.connect(signer);

let processedTransactionHashes = new Set();

async function updateDiscountCoupon() {
    console.log('Editing discount code information...');
    const couponId = 8; 
    const discountPercent = 20; 
    const status = true; 
    const name = "update00000000000000000000"; 
    const commissionPercent = 100;

    const transactionResponse = await contractWithSigner.updateDiscountCoupon(
        couponId,
        discountPercent,
        status,
        name,
        commissionPercent
    );
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
};

(async () => {
    await updateDiscountCoupon();
})().catch(console.error);

provider.on("block", async (blockNumber) => {
    console.log(`Block number: ${blockNumber}`);
    const events = await contract.queryFilter("UpdateCoupon", blockNumber - 1, blockNumber);

    for (const event of events) {
        const { args } = event;

        if (processedTransactionHashes.has(event.transactionHash)) {
            continue;
        }

        console.log('Event UpdateCoupon emitted:', {
            owner: args[0],
            couponId: Number(args[1]),  
            status: args[2],
            discountPercent: Number(args[3]),  
            name: args[4],
            commissionPercent: Number(args[5]),  
            transactionHash: event.transactionHash
        });

        const existingRecord = await DiscountCoupon.findOne({ couponId: Number(args[1]) });

        if (existingRecord) {
            existingRecord.discountPercent = Number(args[3]);
            existingRecord.status = args[2];
            existingRecord.name = args[4];
            existingRecord.commissionPercent = Number(args[5]);
            existingRecord.transactionHash = event.transactionHash;

            await existingRecord.save();
            console.log("DiscountCoupon data updated in MongoDB successfully!");
        } else {
            console.log(`Discount coupon with ID ${args[1]} does not exist in MongoDB.`);
        }

        processedTransactionHashes.add(event.transactionHash);
    }
});
