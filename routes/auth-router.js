const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const UserModel = require("../models/user-model.js");
const multer = require('multer');

const myUploader = multer(
  {
    dest: __dirname + "/../public/uploads"
  }
);


router.get("/signup", (req, res, next) => {
  if(req.user){
    res.redirect("/");
    return;
  }
  res.render("auth-views/signup.ejs");
});

router.post("/process-signup", myUploader.single("avatarUrl"), (req, res, next) => {
  if (req.body.signupEmail === "" || req.body.signupPassword === "") {
    res.locals.feedbackMessage = "We need both email and password";
    res.render("auth-views/signup.ejs");
    return;
  }
  UserModel.findOne({
      email: req.body.signupEmail
    },
    (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }
      if (foundUser) {
        res.locals.feedbackMessage = "Email address already registered";
        res.render("auth-views/signup.ejs");
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const scrambledPass = bcrypt.hashSync(req.body.signupPassword, salt);

      const theUser = new UserModel({
        email: req.body.signupEmail,
        encryptedPassword: scrambledPass
      });
      if(req.file){
        theUser.avatarUrl = "/uploads/" + req.file.filename;
      }
      theUser.save((err) => {
        if (err) {
          next(err);
          return;
        }
        req.flash("signupSuccess", "Sign up successful! Please log in.")
        res.redirect("/");
      });
    }
  );

});

router.get("/login", (req, res, next) => {
  if(req.user){
    res.redirect("/");
    return;
  }
  res.locals.flashError = req.flash("error");
  res.locals.logoutFeedback = req.flash("logoutSuccess");
  res.locals.securityFeedback = req.flash("securityError");
  res.render("auth-views/login.ejs");
});

router.post("/process-login",
  //name of strategy, settings obj
  passport.authenticate('local', {
    successRedirect: "/offers",
    failureRedirect: "/login",
    failureFlash: true
  })

);

router.get("/logout", (req, res, next) =>{
  req.logout();
  req.flash("logoutSuccess", "Logged out.")
  res.redirect("/login");
});

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback",
//name of strategy, settings obj
  passport.authenticate("facebook", {
    successRedirect: "/offers",
    failureRedirect: "login",
    failureFlash: true
  })
);

router.get("/auth/google", passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/plus.login",
    "https://www.googleapis.com/auth/plus.profile.emails.read"
  ]
}));
router.get("/auth/google/callback",
  passport.authenticate("google", {
      successRedirect: "/offers",
      failureRedirect: "/login",
      failureFlash: true
  })
);

module.exports = router;
