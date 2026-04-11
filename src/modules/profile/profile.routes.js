const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// This maps to POST /api/v1/profiles
router.post("/", profileController.initializeProfile);

module.exports = router;
