import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const MyTokenModule = buildModule("MyTokenModule", (m) => {
    const ONE_GWEI: bigint = parseEther("0.001");
    const initialSupply = m.getParameter("initialSupply", ONE_GWEI);
    const token = m.contract("MyToken", [initialSupply]);
    return { token };
});

export default MyTokenModule;