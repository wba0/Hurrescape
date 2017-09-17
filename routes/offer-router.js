const express = require('express');
const OfferModel = require('../models/offer-model.js');
const router = express.Router();
const multer = require('multer');
const ensureLogin = require('connect-ensure-login');


const myUploader = multer(
  {
    dest: __dirname + "/../public/uploads"
  }
);
router.get("/offers", ensureLogin.ensureLoggedIn("/"), (req, res, next) => {
  OfferModel.find(
    {owner: req.user._id},
      (err, offersFromDb) => {
        if(err){
          next(err);
          return;
        }
        // res.locals.securityFeedback = securityError;
        // res.locals.updateFeedback = req.flash("updateSuccess");
        res.locals.listOfOffers = offersFromDb;
        res.render("offer-views/offers.ejs");


      }
  );

});

//<form method="post" action="/rooms">
router.post("/offers", ensureLogin.ensureLoggedIn("/"), (req, res, next) => {

  const theOffer = new OfferModel({
      origin: req.body.originCity,
      originLatLng: req.body.originCityLatLng,
      destination: req.body.destinationCity,
      destinationLatLng: req.body.destinationCityLatLng,
      car: req.body.carType,
      spaces: req.body.spacesAvailable,
      pets: req.body.petsAccepted,
      departureDate: req.body.departureDate,
      departureTime: req.body.departureTime,
      barter: req.body.barterItem,

      owner: req.user._id //logged in user's ID from passport
    });
    theOffer.save((err) => {
      console.log(req.body)
      console.log("origin city---> ", req.body.originCity)
      if(err){
        console.log(err);
        next(err);
        return;
      }
      req.flash("offerFeedback", "Offer added.");
      res.redirect("/offers");
    });

});

// router.get("/myrooms", (req, res, next) => {
//
//   RoomModel.find(
//     {owner: req.user._id},
//       (err, foundRooms) => {
//         if(err){
//           next(err);
//           return;
//         }
//         res.locals.securityFeedback = securityError;
//         res.locals.listOfRooms = foundRooms;
//         res.locals.updateFeedback = req.flash("updateSuccess");
//         res.render("room-views/user-rooms.ejs")
//       }
//   );
// });
//
// router.get("/rooms/:roomId/edit", (req, res, next) => {
//
//   RoomModel.findById(
//     req.params.roomId,
//     (err, roomFromDb) => {
//       if(err){
//         next(err);
//         return;
//       }
//       if(roomFromDb.owner.toString() !== req.user._id.toString()){
//         req.flash("securityError", "You can only edit your own rooms.");
//         res.redirect("/myrooms");
//         return;
//       }
//       res.locals.roomInfo = roomFromDb;
//       res.render("room-views/room-edit.ejs")
//     }
//   );
// });
//
// router.post("/rooms/:roomId", myUploader.single("roomPhoto"), (req, res, next) => {
//
//   RoomModel.findById(
//     req.params.roomId,
//     (err, roomFromDb) => {
//       if(err){
//         next(err);
//         return;
//       }
//       if(roomFromDb.owner.toString() !== req.user._id.toString()){
//         req.flash("securityError", "You can only edit your own rooms.");
//         res.redirect("/myrooms");
//         return;
//       }
//
//       roomFromDb.name = req.body.roomName;
//       roomFromDb.desc = req.body.roomDesc;
//
//       if(req.file){
//         roomFromDb.photoUrl = "/uploads/" + req.file.filename;
//       }
//
//       roomFromDb.save((err) => {
//         if(err){
//           next(err);
//           return;
//         }
//         req.flash("updateSuccess", "Room Update Successful!");
//         res.redirect("/myrooms");
//       });
//     }
//   );
// });
//
module.exports = router;
