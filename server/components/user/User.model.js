const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { SALT_ROUNDS } = require("../../constants/Constant");

// Create Schema
const userSchema = new Schema({
  uid: {
    type: String,
    default: uuid.v1,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Add a middleware
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Add methods
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

// Add options
userSchema.options.toJSON = {
  transform: async function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.password;
    return await ret;
  },
};

// Create Model
const User = mongoose.model("User", userSchema);

// export model
module.exports = User;
