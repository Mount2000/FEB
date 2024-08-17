import { http, createConfig, createStorage } from "wagmi";
import { holesky, taikoHekla } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

export const config = createConfig({
  autoConnect: true,
  chains: [holesky, taikoHekla],
  connectors: [injected(), metaMask()],
  storage: createStorage({ storage: window.localStorage }),
  transports: {
    [holesky.id]: http(),
    [taikoHekla.id]: http(),
  },
});
