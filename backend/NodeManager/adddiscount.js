require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers');
const contractABI = require('../artifacts/NodeManager.json'); 
const { DiscountCoupon } = require('../database'); 
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = '0x3e42ac96BE68f0401307F350b090270Ec01ab44b';
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const contractWithSigner = contract.connect(signer);

let processedTransactionHashes = new Set();

async function addDiscountCoupon() {
    console.log('Calling addDiscountCoupon function...');
    const discountPercent = 10;
    const name = "My Discount Coupon";
    const commissionPercent = 5;
    const owner = '0x3C83Af440750e452fBaC4CA25A156071e7a34aD9'; 

    const transactionResponse = await contractWithSigner.addDiscountCoupon(
        discountPercent,
        name,
        commissionPercent,
        owner
    );
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
};

(async () => {
    await addDiscountCoupon();
})().catch(console.error);

provider.on("block", async (blockNumber) => {
    console.log(`Block number: ${blockNumber}`);
    const events = await contract.queryFilter("AddCoupon", blockNumber - 1, blockNumber);

    for (const event of events) {
        const { args } = event;

        if (processedTransactionHashes.has(event.transactionHash)) {
            continue;
        }

        console.log('Event AddCoupon emitted:', {
            owner: args[0],
            couponId: args[1].toString(), 
            status: args[2],
            discountPercent: args[3],
            name: args[4],
            commissionPercent: args[5],
            code: args[6],
            transactionHash: event.transactionHash
        });

        const existingRecord = await DiscountCoupon.findOne({ couponId: args[1].toString() });
        if (!existingRecord) {
            const discountCoupon = new DiscountCoupon({
                owner: args[0],
                couponId: Number(args[1].toString()), 
                status: args[2],
                discountPercent: Number(args[3]),
                name: args[4],
                commissionPercent: Number(args[5]),
                code: args[6],
                transactionHash: event.transactionHash
            });

            await discountCoupon.save();
            console.log("DiscountCoupon data saved to MongoDB successfully!");
        }

        processedTransactionHashes.add(event.transactionHash);
    }
});
