class DiscoveryController {
  constructor(discoveryService, researcherService) {
    this.discoveryService = discoveryService;
    this.researcherService = researcherService;
  }

  // POST /api/discovery/map
  // Triggered after GVM validates 'targetIndustry' and 'breadth'
  mapNiches = async (req, res, next) => {
    try {
      const { targetIndustry, breadth } = req.body;
      const suggestions = await this.discoveryService.mapAdjacentNiches(
        targetIndustry,
        breadth,
      );

      return res.status(200).json({
        success: true,
        data: {
          input: targetIdustry,
          breadth,
          suggestions,
        },
      });
    } catch (error) {
      next(error); // Pass to your global error handler
    }
  };

  // POST /api/discovery/select
  // Saves user-selected niches to transition into Researcher phase
  selectNiches = async (req, res, next) => {
    try {
      const { selectedNiches, urlsToScrape } = req.body;
      const userId = req.user.id; // Assumes auth middleware prepends user

      // 1. Persist the selection in DB
      const session = await this.discoveryService.finalizeDiscoverySelection(
        selectedNiches,
        userId,
      );

      // 2. Trigger Deep Dive (Fire and Forget for now)
      // Note: In Phase 3, this would be a Queue.add() call.
      this.researcherService
        .executeDeepDive(urlToScrape)
        .catch((err) => console.error("Background Research Error:", err));

      return res.status(201).json({
        success: true,
        message: "Selection saved. Researching targets in the background.",
        sessionId: session.id,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default DiscoveryController;
