const profileService = require("../services/profileService");

const initializeProfile = async (req, res) => {
  try {
    const { email, companyName, website } = req.body;

    // Basic validation (we'll upgrade this to Zod later)
    if (!email || !companyName) {
      return res
        .status(400)
        .json({ error: "Email and Company Name are required." });
    }

    const newProfile = await profileService.createInitialProfile({
      email,
      companyName,
      website,
    });

    res.status(201).json({
      message: "Profile initialized successfully",
      data: newProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { initializeProfile };
