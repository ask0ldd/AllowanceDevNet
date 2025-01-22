import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const MyTokenModule = buildModule("MyERC20Token", (m) => {
    const ONE_GWEI: bigint = parseEther("0.001")
    const initialSupply = m.getParameter("initialSupply", ONE_GWEI)
    const token = m.contract("ERC20Token", [initialSupply])
    return { token }
})

export default MyTokenModule