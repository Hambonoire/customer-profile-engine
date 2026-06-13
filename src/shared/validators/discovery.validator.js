import Joi from "joi";

//Schemas for the Discovery Module
export const discoverySchema = {
  // POST /api/discovery/map
  map: Joi.object({
    targetIndustry: Joi.string().trim().min(3).max(50).required().messages({
      "string.empty": "Target industry is required to map adjacent niches",
      "string.min": "Target industry must be at least 3 characters long",
    }),

    // Breadth Parameter: 1 (Tight/Direct) to 5 (Wide/Supply Chain)
    breadth: Joi.number().integer().min(1).max(5).default(1),
  }),

  // POST /api/discovery/select
  select: Joi.object({
    selectedNiches: Joi.array()
      .items(Joi.string().trim().required())
      .min(1)
      .unique()
      .required()
      .messages({
        "array.min": "Please select at least one mission-aligned niche",
        "array.unique": "Duplicate niches are not allowed in the selection",
      }),
  }),
};
