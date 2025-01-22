import { createPublicClient, http, parseAbi, createWalletClient } from 'viem';
import { hardhat } from 'viem/chains';

const client = createPublicClient({
  chain: hardhat,
  transport: http('http://127.0.0.1:8545')
});

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const accountAddress = '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097'
const contractABI = parseAbi([
  'function withdraw() public'
])

const walletClient = createWalletClient({
    accountAddress,
    chain: hardhat,
    transport: http()
  })

async function callWithdraw() {
  try {
    const { request } = await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'withdraw',
      account: accountAddress,
    })
    
    const hash = await walletClient.writeContract(request)
    
    console.log('Transaction hash:', hash)
    
    const receipt = await client.waitForTransactionReceipt({ hash })
    
    console.log('Transaction mined:', receipt)
  } catch (error) {
    console.error('Error calling withdraw:', error)
  }
}

await callWithdraw()