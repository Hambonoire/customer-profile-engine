import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

class ResearcherService {
  constructor(prismaInstance, profileService) {
    this.prisma = prismaInstance;
    this.profileService = profileService; // For persisting final validated data
  }

  /**
   * Main entry point for a Deep Dive session.
   * @param {string[]} urls - List of targets to research.
   */
  async executeDeepDive(urls) {
    const browser = await puppeteer.launch({ headless: "new" });
    const results = [];

    for (const url of urls) {
      try {
        const pageData = await this._scrapeTarget(browser, url);
        const enrichedProfile = this._parseMetadata(pageData);

        // Persist via ProfileService as per Phase 2 requirements
        await this.profileService.createProfile({
          url,
          ...enrichedProfile,
          source: "RESEARCHER_DEEP_DIVE",
        });

        results.push({ url, status: "SUCCESS" });
      } catch (error) {
        results.push({ url, status: "FAILED", error: error.message });
      }
    }

    await browser.close();
    return results;
  }

  /**
   * Private helper to fetch page content using a headless browser
   */
  async _scrapeTarget(browser, url) {
    const page = await browser.newPage();
    await page.setUserAgent("Analytic-Lead-Gen-Bot/1.0");
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    const html = await page.content();
    await page.close();
    return html;
  }

  /**
   * Identifies Tech Stack (Shopify, etc.) and Compliance (FSVP)
   */
  _parseMetadata(html) {
    const $ = cheerio.load(html);
    const text = $("body").text().toLowerCase();

    return {
      techStack: this._detectTechStack(html),
      isFSVPCompliant:
        text.includes("fsvp") || text.includes("foreign supplier verification"),
      metadata: {
        title: $("title").text(),
        description: $('meta[name="description"]').attr("content"),
      },
    };
  }

  _detectTechStack(html) {
    const stack = [];
    if (html.includes("://shopify.com")) stack.push("Shopify");
    if (html.includes("klaviyo")) stack.push("Klaviyo");
    if (html.includes("wp-content")) stack.push("WordPress");
    return stack;
  }
}

export default ResearcherService;
