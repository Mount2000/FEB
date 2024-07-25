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
    console.log('Calling updateDiscountCoupon function...');
    const _couponId = 1; 
    const discountPercent = 15;
    const name = "Updated Discount Coupon";
    const commissionPercent = 7;

    const transactionResponse = await contractWithSigner.updateDiscountCoupon(
        _couponId,
        discountPercent,
        true, 
        name,
        commissionPercent
    );
    await transactionResponse.wait();
    console.log(`Transaction hash: ${transactionResponse.hash}`);
}

(async () => {
    await writeContract();
})().catch(console.error);
