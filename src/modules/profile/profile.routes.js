const express = require("express");
const router = express.Router();
const validate = require("../../shared/middleware/validate.middleware");
const { profileSchema } = require("../../shared/validators/profile.validator");
const ProfileController = require("./profile.controller");

const profileController = new ProfileController();

// Add the 'validate' middleware as the second argument
router.post("/", validate(profileSchema), (req, res) =>
  profileController.initializeProfile(req, res),
);

// For now, comment out the GET route until you write the list() method in your controller
// router.get("/", profileController.list);

module.exports = router;
