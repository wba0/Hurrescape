const passport = require('passport');
const UserModel = require('../models/user-model.js');

//serialiezUser is called when the user logs in
//it determines what gets saved into the session when you log in
passport.serializeUser((user, done) => {
  done(null, user._id);
});

//deserializeUser is called on every request AFTER logging in
passport.deserializeUser((id, done) => {
  UserModel.findById(
    id,
    (err, userFromDb) => {
      if (err) {
        done(err);
        return;
      }
      //give passport the user document from the database
      done(null, userFromDb);
    }
  );
});


//------------------------------------------------------------------

//STRATEGY setup

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

//setup a new Strategy
passport.use(
  new LocalStrategy({
      usernameField: "loginEmail",
      passwordField: "loginPassword"
    },
    //settings defined
    (emailValue, passValue, done) => {
      //find user with email and confirm password is correct
      UserModel.findOne({
          email: emailValue
        },
        (err, userFromDb) => {
          if (err) {
            done(err);
            return;
          }
          if (userFromDb === null) {

            //    no error, login failed
            done(null, false, {
              message: "Email is wrong"
            });
            return;
          }
          const validPassword = bcrypt.compareSync(passValue, userFromDb.encryptedPassword);
          if (validPassword === false) {
            done(null, false, {
              message: "Password is wrong"
            });
            return;
          }
          //if everything works, send passport userFromDb
          done(null, userFromDb);
          //passport takes userFromDb and calls serializeUser
        }
      );
    }
  )
);

const FbStrategy = require('passport-facebook').Strategy;
passport.use(
  new FbStrategy({
      clientID: process.env.fb_app_id,
      clientSecret: process.env.fb_app_secret,
      callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Facebook user info: ", profile);
      UserModel.findOne({
          facebookID: profile.id
        },
        (err, userFromDb) => {
          if (err) {
            done(err);
            return;
          }
          if (userFromDb) {
            done(null, userFromDb);
            return;
          }
          const theUser = new UserModel({
            facebookID: profile.id,
            email: profile.displayName,
          });
          theUser.save((err) => {
            if(err){
              done(err);
              return;
            }
            done(null, theUser);
          });
        }
      );
    }
  )
);

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.google_app_id,
      clientSecret: process.env.google_app_secret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("google profile obj", profile);
      UserModel.findOne(
        {googleID: profile.id},
        (err, userFromDb) => {
          if(err){
            done(err);
            return
          }
          if (userFromDb) {
            done(null, userFromDb);
            return;
          }
          const theUser = new UserModel({
            googleID: profile.id,
            email: profile.emails[0].value,
            avatarUrl: profile.image.url
          });
          theUser.save((err) => {
            if(err){
              done(err);
              return;
            }
            done(null, theUser);
          })
        }
      );
    }
  )
);
