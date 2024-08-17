const contract = {
  testnet: {
    CONTRACT_ADDRESS: "0x2029Ca1e4A5954781a271d6Fa3598bF4434969f5",
    CONTRACT_ABI: [
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
  mainnet: {
    CONTRACT_ADDRESS: "0x2029Ca1e4A5954781a271d6Fa3598bF4434969f5",
    CONTRACT_ABI: [
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
};

const taiko_token_contract = contract[process.env.REACT_APP_ENV || "testnet"];
export default taiko_token_contract;
