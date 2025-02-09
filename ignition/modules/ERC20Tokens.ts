import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { IgnitionModuleBuilder, NamedArtifactContractDeploymentFuture } from "@nomicfoundation/ignition-core";
const { setNonce } = require("@nomicfoundation/hardhat-network-helpers");

const MyTokensModule = buildModule("MyERC20Tokens", (m : IgnitionModuleBuilder) => {
    
    const supply = 2000

    const tokens = [
        { name: "CrystalDrive", symbol: "CRD", amount : 9401 },
        { name: "CyberSpark", symbol: "CSP", amount : 2936 },
        { name: "EchoChain", symbol: "ECH", amount : 6615 },
        { name: "NeoNova", symbol: "NOV", amount : 4435 },
        { name: "NimbusNet", symbol: "NMB", amount : 7780 },
        { name: "PrimeFlow", symbol: "PRM", amount : 3074 },
        { name: "Quantum", symbol: "QTM", amount : 5146 },
        { name: "SolarFlare", symbol: "SFL", amount : 0 }, // token free from any allowanceby default
        { name: "StellarPulse", symbol: "STP", amount : 2983 },
        { name: "VertexCoin", symbol: "VTX", amount : 699 },
        { name: "ZenithToken", symbol: "ZNT", amount : 2712 }, // zenith isn't deployed ?!!!
    ] as const

    const spenderAddresses = [

    ] as const

    const spenderAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'

    let createdTokens: { [key: string]: NamedArtifactContractDeploymentFuture<string> } = {}

    tokens.forEach((token, index) => {
        createdTokens[token.name] = m.contract("ERC20Token", [
            token.name,
            token.symbol,
            supply * (index + 1), // !!! (BigInt(index) + 1n)
        ], { id: token.name })

        // setNonce(accountAddress, index);

        if(token.name != "SolarFlare") m.call(createdTokens[token.name], "approve", [spenderAddress, 1000n])

        const transferAddress = "0xbc389292158700728d014d5b2b6237bfd36fa09c";
        // m.call(createdTokens[token.name], "transfer", [transferAddress, 1000000000n]);
        m.call(createdTokens[token.name], "transfer", [transferAddress, 100n]);

        // !!! fix calling an account which is not a contract error
    })

    return createdTokens
})

export default MyTokensModule