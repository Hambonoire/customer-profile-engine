const { PrismaClient } = require("@prisma/client");

class ProfileService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createInitialProfile(data) {
    return await this.prisma.customerProfile.create({ data });
  }
}

module.exports = ProfileService;
