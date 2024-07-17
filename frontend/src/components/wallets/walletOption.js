import { Button, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Connector, useConnect } from "wagmi";
import CustomButton from "../button";

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  const walletConnectors = connectors?.filter(
    (connectors) => connectors?.type == "injected"
  );
  console.log({ connectors });
  return (
    <Flex flexDirection={"column"} gap={"12px"}>
      {walletConnectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </Flex>
  );
}

function WalletOption({ connector, onClick }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <CustomButton disabled={!ready} onClick={onClick}>
      {connector.name}
    </CustomButton>
  );
}
