const passport = require("passport");
const db = require("../models/index.js");
const { STATUS, MESSAGE, ERROR_MESSAGE } = require("../utils/contants.js");

const Users = db.users;

const twitter = async (req, res) => passport.authenticate("twitter");
const callback = async (req, res) => {
  res.redirect(`${process.env.REDIRECT_URL}/airdrop`);
};
const twitterProfile = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect(`${process.env.REDIRECT_URL}/airdrop`);
  }
  // Display user profile information
  res.send({
    status: STATUS.OK,
    message: MESSAGE.SUCCESS,
    ret: {
      user: req.user.username,
    },
  });
};
const logOut = async (req, res) => {
  req.logout();
  res.redirect(`${process.env.REDIRECT_URL}/airdrop`);
};
module.exports = {
  twitter,
  callback,
  twitterProfile,
  logOut,
};
