const mongoose = require("mongoose");

// Database connection status
let isConnected = false;

// Connect to MongoDB with retry logic
const connectWithRetry = async (uri, maxRetries = 5) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      isConnected = true;
      console.log("✅ MongoDB connected successfully");
      return;
    } catch (error) {
      console.log(`❌ MongoDB connection attempt ${i + 1} failed:`, error.message);
      if (i === maxRetries - 1) {
        console.error("❌ Failed to connect to MongoDB after all retries");
        process.exit(1);
      }
      // Wait 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Check database connection status
const checkConnection = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log("🔄 Shutting down database connection...");
  try {
    await mongoose.connection.close();
    console.log("✅ Database connection closed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error closing database connection:", error);
    process.exit(1);
  }
};

// Database health check
const healthCheck = async () => {
  try {
    if (!checkConnection()) {
      return {
        status: "disconnected",
        message: "Database is not connected",
        timestamp: new Date().toISOString()
      };
    }

    // Test database operation
    await mongoose.connection.db.admin().ping();
    
    return {
      status: "healthy",
      message: "Database is connected and responsive",
      timestamp: new Date().toISOString(),
      collections: Object.keys(mongoose.connection.collections)
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

// Get database statistics
const getDatabaseStats = async () => {
  try {
    if (!checkConnection()) {
      throw new Error("Database not connected");
    }

    const stats = await mongoose.connection.db.stats();
    return {
      database: stats.db,
      collections: stats.collections,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
      indexes: stats.indexes,
      indexSize: stats.indexSize,
      objects: stats.objects,
      avgObjSize: stats.avgObjSize,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Failed to get database stats: ${error.message}`);
  }
};

// Clear all collections (for testing)
const clearAllCollections = async () => {
  try {
    if (!checkConnection()) {
      throw new Error("Database not connected");
    }

    const collections = mongoose.connection.collections;
    const clearPromises = Object.keys(collections).map(collectionName => {
      return collections[collectionName].deleteMany({});
    });

    await Promise.all(clearPromises);
    console.log("✅ All collections cleared successfully");
  } catch (error) {
    throw new Error(`Failed to clear collections: ${error.message}`);
  }
};

// Backup database (basic implementation)
const backupDatabase = async () => {
  try {
    if (!checkConnection()) {
      throw new Error("Database not connected");
    }

    const collections = mongoose.connection.collections;
    const backup = {};

    for (const [collectionName, collection] of Object.entries(collections)) {
      backup[collectionName] = await collection.find({}).lean();
    }

    return {
      timestamp: new Date().toISOString(),
      collections: Object.keys(backup),
      data: backup
    };
  } catch (error) {
    throw new Error(`Failed to backup database: ${error.message}`);
  }
};

// Set up event listeners
const setupEventListeners = () => {
  mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected");
    isConnected = true;
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
    isConnected = false;
  });

  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected");
    isConnected = false;
  });

  // Graceful shutdown on process termination
  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
};

module.exports = {
  connectWithRetry,
  checkConnection,
  gracefulShutdown,
  healthCheck,
  getDatabaseStats,
  clearAllCollections,
  backupDatabase,
  setupEventListeners
}; 