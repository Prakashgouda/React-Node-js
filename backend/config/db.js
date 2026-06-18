const mongoose = require("mongoose");

let mongodInstance = null;

async function connectDB() {
  let mongoUri = process.env.MONGO_URI || null;

  if (!mongoUri) {
    // try to use an in-memory MongoDB for development when no MONGO_URI provided
    try {
      const { MongoMemoryServer } = require("mongodb-memory-server");
      mongodInstance = await MongoMemoryServer.create();
      mongoUri = mongodInstance.getUri();
      console.log("Started in-memory MongoDB");
    } catch (err) {
      // If mongodb-memory-server is not installed, fall back to localhost URI
      mongoUri = "mongodb://127.0.0.1:27017/react_node_auth";
    }
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

process.on("exit", async () => {
  if (mongodInstance) {
    try {
      await mongodInstance.stop();
      console.log("Stopped in-memory MongoDB");
    } catch (e) {
      // ignore
    }
  }
});

module.exports = connectDB;
