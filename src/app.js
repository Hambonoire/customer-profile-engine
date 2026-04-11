const express = require("express");
const app = express();
const profileRoutes = require("./modules/profile/profile.routes");

app.use(express.json()); // Essential for parsing the lead data!

// Mount your modular routes
app.use("/api/profiles", profileRoutes);

module.exports = app;
