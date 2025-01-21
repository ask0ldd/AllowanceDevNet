import { createPublicClient, http, parseAbi, parseUnits, encodeFunctionData } from 'viem';
import { privateKeyToAccount } from 'viem/accounts'
import { hardhat } from 'viem/chains';
// import { erc20Abi } from 'viem/abis'

const client = createPublicClient({
  chain: hardhat,
  transport: http('http://127.0.0.1:8545')
})

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3' // '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
const ownerAddress = '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097'
const spenderAddress =  '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955'

const abi = parseAbi([
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function totalSupply() returns (uint256)',
])

async function readContract(){
    const balance = await client.readContract({
        address: contractAddress,
        abi,
        functionName: 'balanceOf',
        args: [ownerAddress]
      })
      return balance
}

async function readSupply(){
  const supply = await client.readContract({
      address: contractAddress,
      abi,
      functionName: 'totalSupply',
      args: []
    })
    return supply
}

async function setAllowance() {
  /*const erc20ABI = [{
    name: 'approve',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ type: 'bool' }]
  }]*/

  const abi = parseAbi([
    'function approve(address spender, uint256 amount) returns (bool)',
  ])

  const amount = parseUnits('20000', 18) // Adjust the decimal places if needed

  const data = encodeFunctionData({
    abi,
    functionName: 'approve',
    args: [spenderAddress, amount]
  })

  const account = privateKeyToAccount("0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa")

  const request = await client.prepareTransactionRequest({
    account: account, // Use the full account object, not just address
    to: contractAddress,
    data: encodeFunctionData({
      abi,
      functionName: 'approve',
      args: [spenderAddress, amount] // Use parsed amount
    })
  })

  const serializedTransaction = await account.signTransaction({...request})
  console.log('serializedTransaction : ', serializedTransaction)
 
  const hash = await client.sendRawTransaction({ serializedTransaction }) 

  const receipt = await client.waitForTransactionReceipt({ hash })

  return receipt
}

async function readAllowance() {
  {
    const abi = parseAbi([
      'function allowance(address owner, address spender) returns (uint256)',
    ])

    /*const contract = getContract({
      address: contractAddress,
      abi: erc20Abi,
      client
    })*/
  
    try {
      // const allowance = await contract.read.allowance([ownerAddress, spenderAddress])
      const allowance = await client.readContract({
        address: contractAddress,
        abi,
        functionName: 'allowance',
        args: [ownerAddress, spenderAddress]
      })
      return allowance
    } catch (error) {
      console.error('Error checking allowance:', error)
      return null
    }
  }
}


console.log('Balance:', await readContract())

console.log('Supply:', await readSupply())

console.log('Allowance:', await readAllowance())

// console.log('SetAllowanceReceipt :', await setAllowance())