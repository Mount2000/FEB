require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const ethers = require('ethers')
const contractABI =require('../artifacts/NodeManager.json')
const QUICKNODE_ENDPOINT = process.env.HTTP_PROVIDER_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const provider = new ethers.JsonRpcProvider(QUICKNODE_ENDPOINT)
const signer = new ethers.Wallet(PRIVATE_KEY, provider)
const contractAddress = '0x1CaF7974bd319a51B5e3B5f9a42158ce456010Fa'

const contract = new ethers.Contract(contractAddress, contractABI, provider)
const contractWithSigner = contract.connect(signer)


async function writeContract() {
    console.log('Calling addNodeTier function...')
    const name = "My NodeTier"
    const price = 100
    const hashrate = 10
    const farmSpeed = 1000
    const referralRate = 3
    const transactionResponse = await contractWithSigner.addNodeTier(
        name,
        price,
        hashrate,
        farmSpeed,
        referralRate
    )
    await transactionResponse.wait()
    console.log(`Transaction hash: ${transactionResponse.hash}`)
}

; (async () => {

    await writeContract()
})().catch(console.error)
