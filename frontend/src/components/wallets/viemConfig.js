import { createPublicClient, http } from "viem";
import { taikoHekla, holesky, base } from "viem/chains";

const chain = {
  testnet: {
    CHAIN: holesky,
  },
  mainnet: {
    CHAIN: base,
  },
};
export const taikoHeklaClient = createPublicClient({
  chain: chain[process.env.REACT_APP_ENV || "testnet"].CHAIN,
  transport: http(),
});
