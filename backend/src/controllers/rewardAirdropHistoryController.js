const db = require("../models/index.js");
const { STATUS, MESSAGE, ERROR_MESSAGE } = require("../utils/contants.js");

const RewardHistory = db.rewardHistory;

const addRewardHistory = async (req, res) => {
  try {
    const { wallet_address, task_code, point } = req.body;

    if (!wallet_address || !task_code || !point) {
      return res.status(400).json({
        status: STATUS.FAILED,
        message: "Missing required fields",
      });
    }

    const filter = { wallet_address: wallet_address, task_code: task_code };
    let found = await RewardHistory.findOne(filter);
    if (!found) {
      await RewardHistory.create(req.body)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              status: STATUS.FAILED,
              message: ERROR_MESSAGE.CAN_NOT_ADD,
            });
          } else {
            res.send({
              status: STATUS.OK,
              message: MESSAGE.SUCCESS,
              data: data,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .send({ status: STATUS.FAILED, message: error.message });
        });
    } else {
      return res.status(500).json({
        status: STATUS.FAILED,
        message: "User already exists",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: STATUS.FAILED,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const updateRewardHistory = async (req, res) => {
  try {
    const { wallet_address, task_code, point } = req.body;

    if (!wallet_address || !task_code || !point) {
      return res.status(400).json({
        status: STATUS.FAILED,
        message: "Missing required fields",
      });
    }

    const filter = { wallet_address: wallet_address, task_code: task_code };
    const update = { point: point };
    let found = await RewardHistory.findOne(filter);
    if (found) {
      await RewardHistory.findOneAndUpdate(filter, update)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              status: STATUS.FAILED,
              message: ERROR_MESSAGE.CAN_NOT_ADD,
            });
          } else {
            res.send({
              status: STATUS.OK,
              message: MESSAGE.SUCCESS,
              data: data,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .send({ status: STATUS.FAILED, message: error.message });
        });
    } else {
      return res.status(500).json({
        status: STATUS.FAILED,
        message: "User not exists",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: STATUS.FAILED,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const getAllRewardHistory = async (req, res) => {
  try {
    let { limit, offset, sort } = req.body;
    if (!limit) limit = 15;
    if (!offset) offset = 0;
    if (!sort) sort = -1;

    const data = await RewardHistory.find({})
      .skip(Number(offset))
      .limit(Number(limit))
      .sort({ createdAt: Number(sort) });

    return res.status(200).json({
      status: STATUS.OK,
      message: MESSAGE.SUCCESS,
      ret: {
        data: data,
      },
    });
  } catch (e) {
    return res.status(500).json({
      status: STATUS.FAILED,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const getRewardHistory = async (req, res) => {
  try {
    let { wallet_address } = req.body;
    if (!wallet_address) {
      return res.status(400).json({
        status: STATUS.FAILED,
        message: "Missing required fields",
      });
    }

    const data = await RewardHistory.find({
      wallet_address: wallet_address,
    });

    return res.status(200).json({
      status: STATUS.OK,
      message: MESSAGE.SUCCESS,
      ret: {
        data: data,
      },
    });
  } catch (e) {
    return res.status(500).json({
      status: STATUS.FAILED,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const getRewardHistoryByCode = async (req, res) => {
  try {
    let { wallet_address, task_code } = req.body;
    if (!wallet_address || !task_code) {
      return res.status(400).json({
        status: STATUS.FAILED,
        message: "Missing required fields",
      });
    }

    const data = await RewardHistory.findOne({
      wallet_address: wallet_address,
      task_code: task_code,
    });

    return res.status(200).json({
      status: STATUS.OK,
      message: MESSAGE.SUCCESS,
      ret: {
        data: data,
      },
    });
  } catch (e) {
    return res.status(500).json({
      status: STATUS.FAILED,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

module.exports = {
  addRewardHistory,
  updateRewardHistory,
  getRewardHistory,
  getAllRewardHistory,
  getRewardHistoryByCode
};
