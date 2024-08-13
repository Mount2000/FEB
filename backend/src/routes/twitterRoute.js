const express = require("express");
const twitterController = require("../controllers/twiterController");
const passport = require("passport");
const route = express.Router();

route.get("/twitter", passport.authenticate("twitter"));
route.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: `${process.env.REDIRECT_URL}/airdrop`,
  }),
  twitterController.callback
);
route.get("/twitterProfile", twitterController.twitterProfile);
route.get("/logout", twitterController.logOut);

module.exports = route;
