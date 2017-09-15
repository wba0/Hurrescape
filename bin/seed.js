const mongoose = require('mongoose');
const OfferModel = require('../models/offer-model.js');

mongoose.connect(process.env.MONGODB_URI);

const offerArray = [
  {
    origin: ,
    originLatLng: [],
    destination: ,
    destinationLatLng: [],
    car: ,
    spaces: ,
    pets: ,
    departureDate: ,
    departureTime: ,
    barter:
},
  {
    origin: ,
    originLatLng: ,
    destination: ,
    destinationLatLng: ,
    car: ,
    spaces: ,
    pets: ,
    departureDate: ,
    departureTime: ,
    barter:
},
  {
    origin: ,
    originLatLng: ,
    destination: ,
    destinationLatLng: ,
    car: ,
    spaces: ,
    pets: ,
    departureDate: ,
    departureTime: ,
    barter:
}
];

OfferModel.create(
  offerArray,
  (err, offersAfterSave) => {
    if (err) {
      console.log("create seed error", err);
      return;
    }
  }
);
