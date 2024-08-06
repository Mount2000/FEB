const TransactionServices = require("../services/TransactionService");

const createTransaction = async (req, res) => {
  try {
    const { hash, type, ipAddress } = req.body;

    if (!hash || !type || !ipAddress) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing required fields",
      });
    }

    try {
      const response = await TransactionServices.createTransaction(req.body);
      if (response.status === "FAILED") {
        return res.status(401).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: "FAILED",
        message: "Internal Server Error",
        error: error.message,
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const checkIP = async (req, res) => {
  try {
    const ipAddress = req.params.ip;
    if (!ipAddress) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing required fields",
      });
    }
    try {
      const response = await TransactionServices.checkIP(ipAddress);
      if (response.status === "FAILED") {
        return res.status(401).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: "FAILED",
        message: "Internal Server Error",
        error: error.message,
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

module.exports = {
  createTransaction,
  checkIP,
};
