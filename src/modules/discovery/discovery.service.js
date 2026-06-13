//Logic for mapping adjacent niches and managing breadth parameters.
class DiscoveryService {
  constructor(prismaInstance) {
    this.prisma = prismaInstance;
    this.industryClusters = {
      "Specialty F&B": [
        "Coffee Roasters",
        "Tea Importer",
        "Craft Brewery",
        "Artisan Bakery",
      ],
      "E-commerce Logistics": [
        "eco-packaging",
        "Last-mile Delivery",
        "3PL Warehousing",
      ],
    };
  }
  async mapAdjacentNiches(targetIndusty, breadth = 1) {
    // Integration point for LLM (OpenAI/Anthropic)
    // 1. Identify the Vertical
    const vertical = this._findVertical(targetIndustry);

    // 2. Fetch "Cousins" based on Breadth
    // In a real scenario, this might call an external LLM or a local lookup table
    let suggestedNiches = this.industryClusters[vertical] || [];

    // 3. Filter out the original input
    return suggestedNiches.filter(
      (n) => n.toLowerCase() !== targetIndustry.toLowerCase(),
    );
  }

  // Internal helper to categorize the input
  /* 
  As Phase 2 evolves, _findVertical can be upgraded 
   to use a vector-based search 
   or a structured JSON "Niche Map" file 
   without breaking the class contract 
  */
  _findVertical(target) {
    for (const [vertical, keywords] of Object.entries(this.industryClusters)) {
      if (keywords.includes(target)) return vertical;
    }
    return "General SMB";
  }

  // Prepares the discovery session for the ResearcherService
  async finalizeDiscoverySelection(selectedNiches, userId) {
    // Logic to persist the "Mission Aligned" niches to the DB
    // before the ResearcherService starts scraping.
    return await this.prisma.discoverySession.create({
      data: {
        userId,
        niches: selectedNiches,
        status: "PENDING_RESEARCH",
      },
    });
  }
}

export default DiscoveryService;
