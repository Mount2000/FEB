import { http, createConfig, createStorage } from "wagmi";
import { base, mainnet, taikoHekla } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, base, taikoHekla],
  connectors: [injected(), metaMask()],
  storage: createStorage({ storage: window.localStorage }),
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [taikoHekla.id]: http(),
  },
});
