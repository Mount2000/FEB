require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers')
const contractABI = require('../artifacts/NodeManager.json')

const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT)
const signer = new ethers.Wallet(PRIVATE_KEY, provider)

const contractAddress = '0x1CaF7974bd319a51B5e3B5f9a42158ce456010Fa'
const contract = new ethers.Contract(contractAddress, contractABI, signer)

async function writeContract() {
    console.log('Calling buyAdmin function...')
    
    const nodeTierId = 3; 
    const nodeOwner = '0x86ddDF9328021901773a7f1BfbBe0d827c2d193c'; 
    const metadata = 'Node metadata'; 
    
    const transactionResponse = await contract.buyAdmin(
        nodeTierId,
        nodeOwner,
        metadata
    )
    
    await transactionResponse.wait()
    console.log(`Transaction hash: ${transactionResponse.hash}`)
}

(async () => {
    await writeContract()
})().catch(console.error)
