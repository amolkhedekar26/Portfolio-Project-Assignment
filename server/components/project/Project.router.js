const express = require("express");
const router = express.Router();

// Router for the Project routes

const { createProject, getProjectsByUserId } = require("./Project.controller");

router.post("/", createProject);

router.get("/", getProjectsByUserId);

module.exports = router;
