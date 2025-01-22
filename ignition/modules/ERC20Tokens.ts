import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const MyTokensModule = buildModule("MyERC20Tokens", (m) => {
    const ONE_GWEI: bigint = parseEther("0.001")
    
    const token1 = m.contract("ERC20Token", [m.getParameter("initialSupply", ONE_GWEI)], { id: "Token1" });
    const token2 = m.contract("ERC20Token", [m.getParameter("initialSupply", ONE_GWEI)], { id: "Token2" });
    const token3 = m.contract("ERC20Token", [m.getParameter("initialSupply", ONE_GWEI)], { id: "Token3" });
    
    return { token1, token2, token3 }
});

export default MyTokensModule