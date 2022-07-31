const express = require("express");
const router = express.Router();

// Router for user (authentication)

const {
  register,
  login,
  refreshToken,
  forgotPassword,
  verifyEmail,
  resetPassword,
  changePassword,
  logout,
} = require("../user/User.controller");

const { registerUser, loginUser } = require("./Users.controller");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/refresh-token", refreshToken);

router.get("/forgot-password", forgotPassword);

router.post("/verify-email", verifyEmail);

router.get("/reset-password/:id/:resetToken", resetPassword);

router.post("/change-password", changePassword);

router.delete("/logout", logout);

module.exports = router;
