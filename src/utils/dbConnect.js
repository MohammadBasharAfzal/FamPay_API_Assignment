const mongoose = require("mongoose");
const CONSTANTS = require("../config/constants");
const logger = require("../logger");

if (!CONSTANTS.MONGODB_URI) {
  logger.error("MONGODB_URI is undefined! Please check your .env file.");
  process.exit(1);
}

mongoose
  .connect(CONSTANTS.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB 🎉");
  })
  .catch((error) => {
    logger.error("Initial MongoDB connection error 💥:");
    logger.error(error);
    process.exit(1); // Exit app if DB connection fails
  });

const conn = mongoose.connection;

conn.once("open", async () => {
  try {
    await conn.collection("videos").createIndexes({
      title: "text",
      description: "text",
    });
    logger.info("Text indexes created on 'videos' collection.");
  } catch (err) {
    logger.error("Error creating indexes on 'videos' collection:");
    logger.error(err);
  }
});

conn.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

conn.on("error", (error) => {
  logger.error("MongoDB connection error:");
  logger.error(error);
});
