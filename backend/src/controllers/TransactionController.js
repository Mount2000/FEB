const TransactionServices = require("../services/TransactionService");

const createTransaction = async (req, res) => {
  try {
    const { caller, chainId, hash, type, ipAddress, status } = req.body;

    if (!caller || !chainId || !hash || !type || !ipAddress || !status) {
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

const updateTransaction = async (req, res) => {
  try {
    const { hash, status } = req.body;

    if (!hash || !status) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing required fields",
      });
    }

    try {
      const response = await TransactionServices.updateTransaction(req.body);
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

const getTransaction = async (req, res) => {
  try {
    let { caller, limit, offset, sort } = req.body;
    if (!limit) limit = 15;
    if (!offset) offset = 0;
    if (!sort) sort = -1;
    if (!caller) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing required fields",
      });
    }

    try {
      const response = await TransactionServices.getTransaction({
        caller,
        limit,
        offset,
        sort,
      });
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

const getReferrals = async (req, res) => {
  try {
    let { caller, limit, offset, sort } = req.body;
    if (!limit) limit = 15;
    if (!offset) offset = 0;
    if (!sort) sort = -1;
    if (!caller) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing required fields",
      });
    }

    try {
      const response = await TransactionServices.getReferrals({
        caller,
        limit,
        offset,
        sort,
      });
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
    const { ip: ipAddress } = req.query;
    console.log({ ipAddress });
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
  updateTransaction,
  getTransaction,
  getReferrals,
  checkIP,
};
