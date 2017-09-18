const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offerSchema = new Schema({
  origin: {
    type: String,
    required: true
  },
  originLatLng: [
    { type: Number }
  ],
  destination: {
    type: String,
    required: true
  },
  destinationLatLng: [
    { type: Number }
  ],
  originPlaceId: {
    type: String
  },
  destinationPlaceId: {
    type: String
  },
  car: {
    type: String,
    required: true
  },
  spaces: {
    type: Number,
    required: true
  },
  pets: {
    type: Boolean,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  barter: {
    type: String,
    required: true
  },
  //the mongo ID of the user that this offer belongs to
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  },
  ownerAvatar: {
    type: String
  },
  appliedUsers:[{
    type: String
  }]
},
 {
  timestamps: true
}
);

const OfferModel = mongoose.model("Offer", offerSchema);

module.exports = OfferModel;
