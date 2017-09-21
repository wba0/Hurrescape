const mongoose = require('mongoose');
const OfferModel = require('../models/offer-model.js');

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const offerArray = [
  {
    owner : "59c16c71856a295acce2d060",
    origin: "Miami, FL, USA",
    originLatLng: [25.7616798, -80.19179020000001],
    destination: "Orlando, FL, USA",
    destinationLatLng: [28.5383218, -81.37924129999999],
    car: "mini",
    spaces: 2,
    pets: false,
    departureDate: "2017-10-24T00:00:00Z",
    departureTime: "morning",
    barter: "gas",
    appliedUsers: [3051234567, 7867654321]
},
  {
    owner : "59c16c71856a295acce2d060",
    origin: "Miami, FL, USA",
    originLatLng: [25.7616798, -80.19179020000001],
    destination: "Atlanta, GA, USA",
    destinationLatLng: [33.7489954, -84.3879824],
    car: "suv",
    spaces: 4,
    pets: true,
    departureDate: "2017-10-23T00:00:00Z",
    departureTime: "afternoon",
    barter: "water",
    appliedUsers: [3051234567, 7867654321, 5555555555]
},
  {
    owner : "59c16c71856a295acce2d060",
    origin: "Naples, FL, USA",
    originLatLng: [26.1420358, -81.7948103],
    destination: "Orlando, FL, USA",
    destinationLatLng: [28.5383218, -81.37924129999999],
    car: "truck",
    spaces: 7,
    pets: false,
    departureDate: "2017-10-22T00:00:00Z",
    departureTime: "night",
    barter: "food",
    appliedUsers: [3054545545, 3057777777]
},
  {
    owner : "59c16c71856a295acce2d060",
    origin: "Corpus Christi, TX, USA",
    originLatLng: [27.80058279999999, -97.39638100000002],
    destination: "San Antonio, TX, United States",
    destinationLatLng: [29.4241219, -98.49362819999999],
    car: "sedan",
    spaces: 2,
    pets: true,
    departureDate: "2017-11-15T00:00:00Z",
    departureTime: "evening",
    barter: "humor",
    appliedUsers: [3611234567, 3615555555]
},
{
  owner : "59c16c71856a295acce2d060",
  origin: "Taipei City, Taiwan",
  originLatLng: [25.0329636, 121.56542680000007],
  destination: "Kaohsiung City, Taiwan",
  destinationLatLng: [22.6272784, 120.30143529999998],
  car: "mini",
  spaces: 1,
  pets: true,
  departureDate: "2018-02-01T00:00:00Z",
  departureTime: "evening",
  barter: "food",
  appliedUsers: [3611234567, 3615555555]
}

];

OfferModel.create(
  offerArray,
  (err, offersAfterSave) => {
    if (err) {
      console.log("create seed error", err);
      return;
    }
    offersAfterSave.forEach((offer) => {
      console.log("Offer ---> ", offer._id);
    });
  }
);
