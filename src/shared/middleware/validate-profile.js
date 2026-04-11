const { z } = require("zod");

const profileSchema = z.object({
  email: z.string().email({ message: "Invalid business email address" }),
  companyName: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" }),
  website: z.string().url({ message: "Invalid URL format" }).optional(),
});

const validateProfile = (req, res, next) => {
  try {
    profileSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.errors.map((e) => e.message),
    });
  }
};

module.exports = { validateProfile };
