const express = require('express');
const router = express.Router();
const OfferModel = require('../models/offer-model.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.user);
    OfferModel.find(
    {},
    (err, offersFromDb) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.listOfOffers = offersFromDb;
      res.render("index.ejs")

    }
  );
  if (req.user) {
    res.locals.securityFeedback = req.flash("securityError");
    // res.render("user-home.ejs")
  } else {
    res.locals.signupFeedback = req.flash("signupSuccess");
    // res.render("index.ejs")
  }

});

module.exports = router;
