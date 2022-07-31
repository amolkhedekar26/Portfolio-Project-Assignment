const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

// Model for Profile

const options = {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
};

const profileSchema = new Schema(
  {
    uid: {
      type: String,
      default: uuid.v1,
      index: true,
    },
    userId: {
      type: String,
      ref: "User",
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String,
      required: true,
    },
  },
  options
);

profileSchema.virtual("initials").get(function () {
  return `${this.firstName
    .charAt(0)
    .toUpperCase()}${this.lastName.charAt(0).toUpperCase()}`;
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
