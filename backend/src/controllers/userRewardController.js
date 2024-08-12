const db = require("../models/index.js");
const { STATUS, MESSAGE, ERROR_MESSAGE } = require("../utils/contants.js");

const Users = db.users;

const addUserReward = async (req, res) => {
  try {
    const { wallet_address, point } = req.body;

    if (!wallet_address || !point) {
      return res.status(400).json({
        status: STATUS.FAILED,
        message: "Missing required fields",
      });
    }

    let found = await Users.findOne({ wallet_address: wallet_address });
    if (!found) {
      await Users.create(req.body)
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

const updateUserReward = async (req, res) => {
  try {
    const { wallet_address, point } = req.body;

    if (!wallet_address || !point) {
      return res.status(400).json({
        status: STATUS.FAILED,
        message: "Missing required fields",
      });
    }

    const filter = { wallet_address: wallet_address };
    const update = { point: point };
    let found = await Users.findOne(filter);
    if (found) {
      await Users.findOneAndUpdate(filter, update)
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

const getAllUserReward = async (req, res) => {
  try {
    let { limit, offset, sort } = req.body;
    if (!limit) limit = 15;
    if (!offset) offset = 0;
    if (!sort) sort = -1;

    const data = await Users.find({})
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

const getUserReward = async (req, res) => {
  try {
    let { caller } = req.body;
    if (!caller) {
      return res.status(400).json({
        status: STATUS.FAILED,
        message: "Missing required fields",
      });
    }

    const data = await Users.findOne({
      wallet_address: caller,
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
  addUserReward,
  updateUserReward,
  getUserReward,
  getAllUserReward,
};
