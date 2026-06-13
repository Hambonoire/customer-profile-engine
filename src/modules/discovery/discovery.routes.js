import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import DiscoveryController from "./discovery.controller.js";
import DiscoveryService from "./discovery.service.js";
import ResearcherService from "../researcher/researcher.service.js";
import ProfileService from "../profile/profile.service.js";
import { validate } from "../../shared/validate.middleware.js";
import { discoverySchema } from "../../shared/validators/discovery.validator.js";

const router = Router();
const prisma = new PrismaClient(); // Singleton passed to service

// 1. Setup Services (Chain of dependencies)
const profileService = new ProfileService(prisma);
const researcherService = new ResearcherService(prisma, profileService);
const discoveryService = new DiscoveryService(prisma);

// 2. Inject both into the Controller
const controller = new DiscoveryController(discoveryService, researcherService);

// Routes
router.post("/map", validate(discoverySchema.map), controller.mapNiches);
router.post(
  "/select",
  validate(discoverySchema.select),
  controller.selectNiches,
);

export default router;
