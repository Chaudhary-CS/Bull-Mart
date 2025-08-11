const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// Setup test database
const setupTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  console.log("✅ Test database connected");
};

// Teardown test database
const teardownTestDB = async () => {
  if (mongoServer) {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log("✅ Test database disconnected");
  }
};

// Clear all collections
const clearTestData = async () => {
  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

// Create test user data
const createTestUser = () => ({
  name: "Test User",
  email: "test@usf.edu",
  password: "TestPassword123!",
  phoneNumber: "1234567890",
  address: "4202 E Fowler Ave, Tampa, FL 33620"
});

// Create test shop data
const createTestShop = () => ({
  name: "Test Shop",
  email: "shop@usf.edu",
  password: "TestPassword123!",
  phoneNumber: "1234567890",
  address: "4202 E Fowler Ave, Tampa, FL 33620",
  zipCode: 33620
});

// Create test product data
const createTestProduct = (shopId) => ({
  name: "Test Product",
  description: "This is a test product description",
  category: "Electronics",
  tags: "test, electronics, sample",
  originalPrice: 100,
  discountPrice: 80,
  stock: 50,
  images: ["test-image-1.jpg", "test-image-2.jpg"],
  shopId: shopId,
  ratings: 4.5,
  sold_out: 0
});

// Mock JWT token for testing
const generateTestToken = (userId) => {
  // This is a simplified mock token for testing
  return `test_token_${userId}_${Date.now()}`;
};

// Test environment variables
const testEnvVars = {
  NODE_ENV: "test",
  PORT: 8001,
  JWT_SECRET_KEY: "test_jwt_secret_key_for_testing_only",
  JWT_EXPIRES: "1h",
  DB_URL: "mongodb://localhost:27017/bullmart_test"
};

// Setup test environment
const setupTestEnvironment = () => {
  process.env = { ...process.env, ...testEnvVars };
};

// Mock request object for testing
const createMockRequest = (data = {}) => ({
  body: data.body || {},
  params: data.params || {},
  query: data.query || {},
  headers: data.headers || {},
  user: data.user || null,
  file: data.file || null,
  files: data.files || [],
  ip: data.ip || "127.0.0.1",
  method: data.method || "GET",
  path: data.path || "/test"
});

// Mock response object for testing
const createMockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res;
};

// Mock next function for testing
const createMockNext = () => jest.fn();

module.exports = {
  setupTestDB,
  teardownTestDB,
  clearTestData,
  createTestUser,
  createTestShop,
  createTestProduct,
  generateTestToken,
  setupTestEnvironment,
  createMockRequest,
  createMockResponse,
  createMockNext,
  testEnvVars
}; 