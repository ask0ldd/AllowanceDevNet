import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const MyTokenModule = buildModule("MyERC20Token", (m) => {
    const ONE_GWEI: bigint = parseEther("0.001")
    const initialSupply = m.getParameter("initialSupply", ONE_GWEI)
    const token = m.contract("ERC20Token", [initialSupply])
    // Transfer tokens to a specific address
    const recipientAddress = m.getParameter("recipientAddress", "0x1234567890123456789012345678901234567890")
    const transferAmount = m.getParameter("transferAmount", parseEther("0.0001"))
    
    m.call(token, "transfer", [recipientAddress, transferAmount])

    return { token }
})

export default MyTokenModule