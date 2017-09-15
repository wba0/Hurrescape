const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    encryptedPassword: {
      type: String
    },
    facebookID: {
      type: String
    },
    googleID: {
      type: String
    },
    role: {
      type: String,
      enum: ["normal", "admin"],
      default: "normal"
    },
    avatarUrl: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
