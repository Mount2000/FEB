const CHAINS = [
  {
    chainId: 167009,
    rpcUrls: "https://rpc.hekla.taiko.xyz",
  },
];

const STATUS = {
  FAILED: "FAILED",
  OK: "OK",
};

const MESSAGE = {
  SUCCESS: "SUCCESS",
  NO_INPUT: "No Input",
  NO_ADDRESS: "No address",
  INVALID_ADDRESS: "Invalid Address",
  INVALID_INPUT: "Invalid Input",
  INVALID_AUTHENTICATION: "Invalid Authentication",
  NOT_EXIST_ADDRESS: "Not Exist Address",
  INPUT_ALREADY_EXIST: "Input already exist",
};

const ERROR_MESSAGE = {
  SENDING_MAIL: "Error sending email",
  CAN_NOT_UPDATE: "Cannot update. Maybe data was not found!",
  CAN_NOT_ADD: "Cannot Add.",
};

let global_vars = {
  isScanning: true,
};

module.exports = {
  global_vars: global_vars,
  CHAINS: CHAINS,
  STATUS: STATUS,
  MESSAGE: MESSAGE,
  ERROR_MESSAGE: ERROR_MESSAGE,
};
