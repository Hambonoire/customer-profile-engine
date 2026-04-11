// src/modules/profile/profile.service.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProfileService {
  async createInitialProfile(data) {
    return await prisma.customerProfile.create({ data });
  }
}

module.exports = new ProfileService();
