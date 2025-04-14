// server.js
const express = require("express");
const dotenv = require("dotenv");
const api = require("./src/api");
const errorHandler = require("./src/error/errorHandler");

// Load environment variables
dotenv.config({
  path: `${__dirname}/.env.${process.env.NODE_ENV || "dev"}`,
});

// Load constants and DB
const CONSTANTS = require("./src/config/constants");
require("./src/utils/dbConnect");
require("./src/cron/fetchVideos");

const app = express();

app.use(express.json());
app.use("/api", api);
app.use(errorHandler);

// Start server
const PORT = CONSTANTS.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}...`);
});
