import { createPublicClient, http } from "viem";
import { taikoHekla } from "viem/chains";
export const taikoHeklaClient = createPublicClient({
  chain: taikoHekla,
  transport: http(),
});
