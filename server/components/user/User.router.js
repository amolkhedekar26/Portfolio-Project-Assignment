const express = require("express");
const router = express.Router();

// Router for user (authentication)

const {
  registerUser,
  loginUser,
  verifyEmail,
  changePassword,
} = require("./Users.controller");

router.post("/login", loginUser);

router.post("/register", registerUser);

// router.post("/refresh-token", refreshToken);

// router.get("/forgot-password", forgotPassword);

router.post("/verify-email", verifyEmail);

router.post("/change-password", changePassword);

// router.get("/reset-password/:id/:resetToken", resetPassword);

// router.post("/change-password", changePassword);

// router.delete("/logout", logout);

module.exports = router;
