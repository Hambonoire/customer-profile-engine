/**
 * Higher-order function that returns a middleware for a specific Joi schema
 * @param {Object} schema - The Joi schema to validate against
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, // Crucial for Phase 2: keeps incoming scrap data clean
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message.replace(/['"]/g, ""))
        .join(", ");

      return res.status(400).json({
        status: "error",
        message: `Validation failed: ${errorMessage}`,
      });
    }

    // Replace req.body with the sanitized/formatted 'value' from Joi
    req.body = value;
    next();
  };
};

module.exports = validate;
