// import necessary dependencies
require("dotenv").config();
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const db = require("../models");
const User = db.users;

//initialize
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/auth/twitter/callback`,
      passReqToCallback: true,
    },
    function (token, tokenSecret, profile, done) {
      console.log(profile);
      // Save the user profile or any other relevant information
      return done(null, profile);
    }
  )
);

// function to serialize a user/profile object into the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// function to deserialize a user/profile object into the session
passport.deserializeUser(function (user, done) {
  done(null, user);
});
