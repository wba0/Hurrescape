const express = require('express');
const RoomModel = require('../models/room-model.js');
const router = express.Router();
const multer = require('multer');

const myUploader = multer(
  {
    dest: __dirname + "/../public/uploads"
  }
);
router.get("/offers", ensureLogin.ensureLoggedIn("/"), (req, res, next) => {
  res.render("offer-views/offers.ejs");
});

//<form method="post" action="/rooms">
router.post("/offers", ensureLogin.ensureLoggedIn("/"), myUploader.single("roomPhoto"), (req, res, next) => {


  //multer creates req.file with all the file info
  console.log(req.file);

  const theOffer = new OfferModel({
      name: req.body.roomName,
      photoUrl: "/uploads/" + req.file.filename,
      desc: req.body.roomDesc,
      owner: req.user._id //logged in user's ID from passport
    });
    theOffer.save((err) => {
      if(err){
        next(err);
        return;
      }
      req.flash("roomFeedback", "Offer added.");
      res.redirect("/");
    });

});

router.get("/myrooms", (req, res, next) => {
  if(!req.user){
    req.flash("securityError", "Log in to add a room.")
    res.redirect("/login");
    return;
  }
  RoomModel.find(
    {owner: req.user._id},
      (err, foundRooms) => {
        if(err){
          next(err);
          return;
        }
        res.locals.securityFeedback = securityError;
        res.locals.listOfRooms = foundRooms;
        res.locals.updateFeedback = req.flash("updateSuccess");
        res.render("room-views/user-rooms.ejs")
      }
  );
});

router.get("/rooms/:roomId/edit", (req, res, next) => {
  if(!req.user){
    req.flash("securityError", "Log in to add a room.")
    res.redirect("/login");
    return;
  }
  RoomModel.findById(
    req.params.roomId,
    (err, roomFromDb) => {
      if(err){
        next(err);
        return;
      }
      if(roomFromDb.owner.toString() !== req.user._id.toString()){
        req.flash("securityError", "You can only edit your own rooms.");
        res.redirect("/myrooms");
        return;
      }
      res.locals.roomInfo = roomFromDb;
      res.render("room-views/room-edit.ejs")
    }
  );
});

router.post("/rooms/:roomId", myUploader.single("roomPhoto"), (req, res, next) => {
  if(!req.user){
    req.flash("securityError", "Log in to add a room.")
    res.redirect("/login");
    return;
  }
  RoomModel.findById(
    req.params.roomId,
    (err, roomFromDb) => {
      if(err){
        next(err);
        return;
      }
      if(roomFromDb.owner.toString() !== req.user._id.toString()){
        req.flash("securityError", "You can only edit your own rooms.");
        res.redirect("/myrooms");
        return;
      }

      roomFromDb.name = req.body.roomName;
      roomFromDb.desc = req.body.roomDesc;

      //check if req.file, it will be underfined if user doesnt upload anything
      if(req.file){
        roomFromDb.photoUrl = "/uploads/" + req.file.filename;
      }

      roomFromDb.save((err) => {
        if(err){
          next(err);
          return;
        }
        req.flash("updateSuccess", "Room Update Successful!");
        res.redirect("/myrooms");
      });
    }
  );
});

module.exports = router;
