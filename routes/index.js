const express = require('express');
const router = express.Router();
const OfferModel = require('../models/offer-model.js');

/* GET home page. */
router.get("/", (req, res, next) => {
    OfferModel
      .find({})
      .populate("owner")
      .exec((err, offersFromDb) => {
        if (err) {
          next(err);
          return;
        }
        res.locals.listOfOffers = offersFromDb;
        //i want a feedback message here
        //
        res.locals.applySuccessView = req.flash("applySuccess");
        if (req.user) {
          res.locals.securityFeedback = req.flash("securityError");
          res.locals.signupFeedback = req.flash("signupSuccess");

          // res.render("user-home.ejs")
        } else {
          res.locals.signupFeedback = req.flash("signupSuccess");
          // res.render("index.ejs")
        }
        res.render("index.ejs")
      }
  );
});

router.get("/faq", (req, res, next) => {
  res.render("faq.ejs");
})

module.exports = router;
