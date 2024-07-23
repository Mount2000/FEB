import { http, createConfig, createStorage } from "wagmi";
import { holesky, taikoHekla } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [holesky, taikoHekla],
  connectors: [injected(), metaMask()],
  storage: createStorage({ storage: window.localStorage }),
  transports: {
    [taikoHekla.id]: http(),
    [holesky.id]: http(),
  },
});
