const ProfileService = require("./profile.service");

class ProfileController {
  constructor() {
    this.profileService = new ProfileService();
  }

  async initializeProfile(req, res) {
    try {
      const newProfile = await this.profileService.createInitialProfile(
        req.body,
      );

      res.status(201).json({
        message: "Profile initialized successfully",
        data: newProfile,
      });
    } catch (error) {
      // Logic for handling duplicate emails (if you have a unique constraint in Prisma)
      if (error.code === "P2002") {
        return res
          .status(409)
          .json({ error: "Profile with this email already exists" });
      }

      console.error("ProfileController Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

// Now this line will work correctly!
module.exports = ProfileController;
