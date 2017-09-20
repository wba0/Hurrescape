const mongoose = require('mongoose');
const OfferModel = require('../models/offer-model.js');

mongoose.connect(process.env.MONGODB_URI);

const offerArray = [
  {
    origin: "Miami, FL, USA",
    originLatLng: [25.7616798, -80.19179020000001],
    destination: "Orlando, FL, USA",
    destinationLatLng: [28.5383218, -81.37924129999999],
    car: mini,
    spaces: 2,
    pets: false,
    departureDate: ISODate("2017-09-23T00:00:00Z"),
    departureTime: morning,
    barter: "gas",
    appliedUsers: [3051234567, 7867654321]
},
  {
    origin: "Miami, FL, USA",
    originLatLng: [25.7616798, -80.19179020000001],
    destination: "Atlanta, GA, USA",
    destinationLatLng: [],
    car: mini,
    spaces: 2,
    pets: false,
    departureDate: ISODate("2017-09-23T00:00:00Z"),
    departureTime: morning,
    barter: "gas",
    appliedUsers: [3051234567, 7867654321]
},
  {
    origin: "Naples, FL, USA",
    originLatLng: [26.1420358, -81.7948103],
    destination: "Orlando, FL, USA",
    destinationLatLng: [28.5383218, -81.37924129999999],
    car: mini,
    spaces: 2,
    pets: false,
    departureDate: ISODate("2017-09-23T00:00:00Z"),
    departureTime: morning,
    barter: "gas",
    appliedUsers: [3051234567, 7867654321]
},
  {
    origin: "Corpus Christi, TX, USA",
    originLatLng: [],
    destination: "San Antonio, TX, United States",
    destinationLatLng: [],
    car: mini,
    spaces: 2,
    pets: false,
    departureDate: ISODate("2017-09-23T00:00:00Z"),
    departureTime: morning,
    barter: "gas",
    appliedUsers: [3051234567, 7867654321]
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
