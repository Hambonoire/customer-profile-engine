const express = require("express");
const router = express.Router();
const profileController = require("./profile.controller");

router.post("/", profileController.initializeProfile);

// For now, comment out the GET route until you write the list() method in your controller
// router.get("/", profileController.list);

module.exports = router;
