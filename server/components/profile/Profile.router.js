const express = require("express");
const router = express.Router();

// Router for Profile

const { createProfile, getProfile } = require("./Profile.controller");

router.post("/", createProfile);

router.get("/", getProfile);


module.exports = router;
