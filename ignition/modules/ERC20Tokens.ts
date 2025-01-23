import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { IgnitionModuleBuilder, NamedArtifactContractDeploymentFuture } from "@nomicfoundation/ignition-core";
import { parseEther } from "viem";

const MyTokensModule = buildModule("MyERC20Tokens", (m : IgnitionModuleBuilder) => {
    const ONE_GWEI: bigint = parseEther("0.001")

    const tokens = [
        { name: "Quantum", symbol: "QTM" },
        { name: "NeoNova", symbol: "NOV" },
        { name: "CyberSpark", symbol: "CSP" },
        { name: "PrimeFlow", symbol: "PRM" },
        { name: "EchoChain", symbol: "ECH" },
        { name: "StellarPulse", symbol: "STP" },
        { name: "NimbusNet", symbol: "NMB" },
        { name: "VertexCoin", symbol: "VTX" },
        { name: "ZenithToken", symbol: "ZNT" },
        { name: "CrystalDrive", symbol: "CRD" }
    ]

    /*const token1 = m.contract("ERC20Token", [
        "Quantum",
        "QTM",
        ONE_GWEI
    ], { id: "Quantum" })

    return { token1 }*/

    let createdTokens: { [key: string]: NamedArtifactContractDeploymentFuture<string> } = {}

    tokens.forEach(token => {
        createdTokens[token.name] = m.contract("ERC20Token", [
            token.name,
            token.symbol,
            ONE_GWEI
        ], { id: token.name })
    })

    return createdTokens
})

export default MyTokensModule