const express = require("express");
const router = express.Router();

const { createSkills, getSkillsByUserId } = require("./Skills.controller");

router.post("/", createSkills);

router.get("/", getSkillsByUserId);

module.exports = router;
