const express = require('express');
const OfferModel = require('../models/offer-model.js');
const router = express.Router();
const multer = require('multer');
const ensureLogin = require('connect-ensure-login');


const myUploader = multer({
  dest: __dirname + "/../public/uploads"
});
router.get("/offers", ensureLogin.ensureLoggedIn("/"), (req, res, next) => {
  OfferModel.find({
      owner: req.user._id
    },
    (err, offersFromDb) => {
      if (err) {
        next(err);
        return;
      }
      // res.locals.securityFeedback = securityError;
      // res.locals.updateFeedback = req.flash("updateSuccess");
      res.locals.listOfOffers = offersFromDb;
      res.render("offer-views/offers.ejs");

      res.locals.applicationDeleteSuccessMsg = req.flash("applicationDeleteSuccess");


    }
  );

});


router.post("/offers", ensureLogin.ensureLoggedIn("/"), (req, res, next) => {

  const theOffer = new OfferModel({
    origin: req.body.originCity,
    originLatLng: req.body.originCityLatLng,
    destination: req.body.destinationCity,
    destinationLatLng: req.body.destinationCityLatLng,
    originPlaceId: req.body.originPlaceId,
    destinationPlaceId: req.body.destinationPlaceId,
    car: req.body.carType,
    spaces: req.body.spacesAvailable,
    pets: req.body.petsAccepted,
    departureDate: req.body.departureDate,
    departureTime: req.body.departureTime,
    barter: req.body.barterItem,
    owner: req.user._id, //logged in user's ID from passport
  });
  theOffer.save((err) => {
    console.log(req.body)
    console.log("origin city---> ", req.body.originCity)
    if (err) {
      console.log(err);
      next(err);
      return;
    }
    req.flash("offerFeedback", "Offer added.");
    res.redirect("/offers");
  });

});


router.post("/offers/:id", ensureLogin.ensureLoggedIn("/"), (req, res, next) => {

  OfferModel.findById(
    req.params.id,
    (err, offerFromDb) => {
      if (err) {
        next(err);
        return;
      }
      if (offerFromDb.owner.toString() !== req.user._id.toString()) {
        req.flash("securityError", "You can only edit your own rides.");
        res.redirect("/offers");
        return;
      }

      offerFromDb.origin = req.body.originCity;
      offerFromDb.originLatLng = req.body.originCityLatLng;
      offerFromDb.destination = req.body.destinationCity;
      offerFromDb.destinationLatLng = req.body.destinationCityLatLng;
      offerFromDb.originPlaceId = req.body.originPlaceId;
      offerFromDb.destinationPlaceId = req.body.destinationPlaceId;
      offerFromDb.car = req.body.carType;
      offerFromDb.spaces = req.body.spacesAvailable;
      offerFromDb.pets = req.body.petsAccepted;
      offerFromDb.departureDate = req.body.departureDate;
      offerFromDb.departureTime = req.body.departureTime;
      offerFromDb.barter = req.body.barterItem;
      offerFromDb.owner = req.user._id; //logged in user's ID from passport

      offerFromDb.save((err) => {
        if (err) {
          next(err);
          return;
        }
        req.flash("updateSuccess", "Ride Update Successful!");
        res.redirect("/offers");
      });
    }
  );
});


router.get("/offers/:id/delete", ensureLogin.ensureLoggedIn("/"), (req, res, next) => {
  OfferModel.findByIdAndRemove(
    req.params.id,
    (err, offerFromDb) => {
      if (err) {
        console.log(err);
        next(err);
        return;
      }
      res.redirect("/offers");
    });
});


router.post("/offers/:id/apply", (req, res, next) => {
  console.log("req body", req.body);
  OfferModel.findById(
    req.params.id,
    (err, offerFromDb) => {
      if (err) {
        next(err);
        return;
      }
      offerFromDb.appliedUsers.push(req.body.phoneNumber);
      offerFromDb.save((err) => {
        if (err) {
          next(err);
          return;
        }
        req.flash("applySuccess", "Application succesful. Wait for reply from owner.")
        res.redirect("/");
      });
    }
  );

});

router.get("/offers/:offerId/applications/:applicationIndex/delete", ensureLogin.ensureLoggedIn("/"), (req, res, next) => {
  OfferModel.findById(
    req.params.offerId,
    (err, appFromDb) => {
      if (err) {
        next(err);
        return;
      }
      appFromDb.appliedUsers.splice(req.params.applicationIndex, 1);
      appFromDb.save((err) => {
        if (err) {
          next(err);
          return;
        }
        req.flash("applicationDeleteSuccess", "Application removed.");
        res.redirect("/offers");
      });
    }
  );
});


module.exports = router;
