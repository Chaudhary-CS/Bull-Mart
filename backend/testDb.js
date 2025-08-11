const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const Product = require("./model/product");
const Shop = require("./model/shop");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log("Database connection error:", err);
    });
};

const testDatabase = async () => {
  try {
    console.log("Testing database connection...");
    console.log("Database URL:", process.env.DB_URL);
    
    // Check products
    const products = await Product.find();
    console.log(`Found ${products.length} products in database`);
    
    if (products.length > 0) {
      console.log("First product:", products[0].name);
    }
    
    // Check shops
    const shops = await Shop.find();
    console.log(`Found ${shops.length} shops in database`);
    
    if (shops.length > 0) {
      console.log("First shop:", shops[0].name);
    }
    
  } catch (error) {
    console.error("Error testing database:", error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed");
  }
};

connectDatabase();
setTimeout(testDatabase, 2000); 