require("dotenv").config();
console.log("Checking DB URL:", process.env.DATABASE_URL);
const express = require("express");

const app = express();

// Middleware to parse JSON (critical for your controller to read req.body)
app.use(express.json());

const profileRoutes = require("./routes/profileRoutes");
app.use("/api/v1/profiles", profileRoutes);

const PORT = process.env.PORT || 3000;

// Basic Health Check
app.get("/health", (req, res) =>
  res.status(200).send("Project Nexus is Online"),
);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
