const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uuid = require("uuid");

// Create Schema for a Skill
const skillDetailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

// Create Schema for Skills
const skillsSchema = new Schema({
  uid: {
    type: String,
    default: uuid.v1,
  },
  userId: {
    type: String,
    ref: "User",
    unique: true,
    required: true,
  },
  skills: {
    type: [skillDetailsSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Skills = mongoose.model("Skills", skillsSchema);

module.exports = Skills;
