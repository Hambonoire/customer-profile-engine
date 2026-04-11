const profileService = require("./profile.service");

class ProfileController {
  // Move your function inside the class and remove 'const'
  async initializeProfile(req, res) {
    try {
      const { email, companyName, website, fsvpCompliant, leadScore } =
        req.body;

      if (!email || !companyName) {
        return res
          .status(400)
          .json({ error: "Email and Company Name are required." });
      }

      const newProfile = await profileService.createInitialProfile({
        email,
        companyName,
        website,
        fsvpCompliant,
        leadScore,
      });

      res.status(201).json({
        message: "Profile initialized successfully",
        data: newProfile,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

// Now this line will work correctly!
module.exports = new ProfileController();
