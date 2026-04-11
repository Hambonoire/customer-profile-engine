const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProfileService {
  /**
   * Create a new customer profile
   * @param {Object} profileData - The raw lead data
   */
  async createProfile(profileData) {
    try {
      // Business Logic: You could add analytical "enrichment" here later
      return await prisma.profile.create({
        data: profileData,
      });
    } catch (error) {
      throw new Error(`Profile Creation Failed: ${error.message}`);
    }
  }

  async getAllProfiles() {
    return await prisma.profile.findMany();
  }
}

// Export an instance of the class (Singleton pattern)
module.exports = new ProfileService();
