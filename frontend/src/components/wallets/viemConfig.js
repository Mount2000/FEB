import { createPublicClient, http } from "viem";
import { taikoHekla, holesky } from "viem/chains";
export const taikoHeklaClient = createPublicClient({
  chain: holesky,
  transport: http(),
});
