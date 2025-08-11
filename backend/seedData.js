const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env" });

// Import models
const Shop = require("./model/shop");
const Product = require("./model/product");

// Connect to database
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

// Sample shops data
const sampleShops = [
  {
    name: "TechGadgets Pro",
    email: "techgadgets@example.com",
    password: "123456",
    description: "Your one-stop shop for all things tech and gadgets",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    phoneNumber: 1234567890,
    avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    zipCode: 94025,
    availableBalance: 5000,
  },
  {
    name: "Fashion Forward",
    email: "fashion@example.com",
    password: "123456",
    description: "Trendy fashion items for the modern lifestyle",
    address: "456 Fashion Ave, New York, NY 10001",
    phoneNumber: 9876543210,
    avatar: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
    zipCode: 10001,
    availableBalance: 3000,
  },
  {
    name: "Home & Garden Essentials",
    email: "homegarden@example.com",
    password: "123456",
    description: "Everything you need to make your home beautiful",
    address: "789 Garden Lane, Austin, TX 73301",
    phoneNumber: 5551234567,
    avatar: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    zipCode: 73301,
    availableBalance: 2500,
  },
  {
    name: "Sports & Fitness Hub",
    email: "sports@example.com",
    password: "123456",
    description: "Premium sports equipment and fitness gear",
    address: "321 Fitness Blvd, Miami, FL 33101",
    phoneNumber: 4449876543,
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    zipCode: 33101,
    availableBalance: 4000,
  },
  {
    name: "Books & Knowledge",
    email: "books@example.com",
    password: "123456",
    description: "Your gateway to knowledge and imagination",
    address: "654 Library Road, Seattle, WA 98101",
    phoneNumber: 7778889999,
    avatar: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    zipCode: 98101,
    availableBalance: 1500,
  }
];

// Sample products data
const sampleProducts = [
  // Tech Gadgets
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    category: "Electronics",
    tags: "wireless, bluetooth, headphones, music",
    originalPrice: 299,
    discountPrice: 199,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"
    ],
    ratings: 4.5,
    sold_out: 25
  },
  {
    name: "Smartphone Pro Max",
    description: "Latest smartphone with advanced camera system and 5G capability",
    category: "Electronics",
    tags: "smartphone, 5g, camera, mobile",
    originalPrice: 999,
    discountPrice: 899,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop"
    ],
    ratings: 4.8,
    sold_out: 45
  },
  {
    name: "Laptop Ultra",
    description: "High-performance laptop perfect for work and gaming",
    category: "Electronics",
    tags: "laptop, gaming, work, computer",
    originalPrice: 1499,
    discountPrice: 1299,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=500&fit=crop"
    ],
    ratings: 4.7,
    sold_out: 15
  },
  // Fashion
  {
    name: "Designer Denim Jacket",
    description: "Classic denim jacket with modern styling and comfortable fit",
    category: "Fashion",
    tags: "denim, jacket, casual, fashion",
    originalPrice: 89,
    discountPrice: 69,
    stock: 100,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=500&fit=crop"
    ],
    ratings: 4.3,
    sold_out: 60
  },
  {
    name: "Premium Running Shoes",
    description: "Lightweight running shoes with superior comfort and support",
    category: "Fashion",
    tags: "shoes, running, sports, comfortable",
    originalPrice: 129,
    discountPrice: 99,
    stock: 75,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop"
    ],
    ratings: 4.6,
    sold_out: 40
  },
  {
    name: "Elegant Evening Dress",
    description: "Stunning evening dress perfect for special occasions",
    category: "Fashion",
    tags: "dress, evening, elegant, formal",
    originalPrice: 199,
    discountPrice: 149,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop"
    ],
    ratings: 4.9,
    sold_out: 10
  },
  // Home & Garden
  {
    name: "Smart Coffee Maker",
    description: "Programmable coffee maker with built-in grinder and timer",
    category: "Home & Garden",
    tags: "coffee, kitchen, smart, appliance",
    originalPrice: 199,
    discountPrice: 159,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop"
    ],
    ratings: 4.4,
    sold_out: 30
  },
  {
    name: "Garden Tool Set",
    description: "Complete set of essential gardening tools for every gardener",
    category: "Home & Garden",
    tags: "garden, tools, outdoor, gardening",
    originalPrice: 79,
    discountPrice: 59,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&h=500&fit=crop"
    ],
    ratings: 4.2,
    sold_out: 35
  },
  {
    name: "Modern Floor Lamp",
    description: "Contemporary floor lamp with adjustable brightness and color temperature",
    category: "Home & Garden",
    tags: "lamp, lighting, modern, home",
    originalPrice: 149,
    discountPrice: 119,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop"
    ],
    ratings: 4.5,
    sold_out: 20
  },
  // Sports & Fitness
  {
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with alignment lines and carrying strap",
    category: "Sports & Fitness",
    tags: "yoga, fitness, mat, exercise",
    originalPrice: 49,
    discountPrice: 39,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop"
    ],
    ratings: 4.7,
    sold_out: 55
  },
  {
    name: "Dumbbell Set",
    description: "Adjustable dumbbell set perfect for home workouts",
    category: "Sports & Fitness",
    tags: "dumbbells, fitness, workout, strength",
    originalPrice: 199,
    discountPrice: 169,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop"
    ],
    ratings: 4.6,
    sold_out: 15
  },
  {
    name: "Basketball",
    description: "Official size basketball with excellent grip and durability",
    category: "Sports & Fitness",
    tags: "basketball, sports, outdoor, game",
    originalPrice: 39,
    discountPrice: 29,
    stock: 100,
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop"
    ],
    ratings: 4.4,
    sold_out: 70
  },
  // Books
  {
    name: "The Art of Programming",
    description: "Comprehensive guide to modern programming techniques and best practices",
    category: "Books",
    tags: "programming, technology, education, coding",
    originalPrice: 49,
    discountPrice: 39,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop"
    ],
    ratings: 4.8,
    sold_out: 25
  },
  {
    name: "Cooking Masterclass",
    description: "Learn to cook like a professional chef with step-by-step instructions",
    category: "Books",
    tags: "cooking, recipes, food, kitchen",
    originalPrice: 35,
    discountPrice: 28,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop"
    ],
    ratings: 4.5,
    sold_out: 40
  },
  {
    name: "Mindfulness Meditation",
    description: "Complete guide to mindfulness and meditation practices",
    category: "Books",
    tags: "meditation, mindfulness, wellness, self-help",
    originalPrice: 25,
    discountPrice: 20,
    stock: 70,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop"
    ],
    ratings: 4.6,
    sold_out: 35
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");
    
    // Clear existing data
    await Shop.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");
    
    // Create shops
    const createdShops = [];
    for (const shopData of sampleShops) {
      const shop = await Shop.create(shopData);
      createdShops.push(shop);
      console.log(`Created shop: ${shop.name}`);
    }
    
    // Create products and assign them to shops
    const productsPerShop = Math.ceil(sampleProducts.length / createdShops.length);
    
    for (let i = 0; i < sampleProducts.length; i++) {
      const shopIndex = Math.floor(i / productsPerShop);
      const shop = createdShops[shopIndex];
      
      const productData = {
        ...sampleProducts[i],
        shopId: shop._id,
        shop: {
          _id: shop._id,
          name: shop.name,
          email: shop.email,
          avatar: shop.avatar,
          address: shop.address,
          phoneNumber: shop.phoneNumber,
          zipCode: shop.zipCode,
        }
      };
      
      const product = await Product.create(productData);
      console.log(`Created product: ${product.name} for shop: ${shop.name}`);
    }
    
    console.log("Database seeding completed successfully!");
    console.log(`Created ${createdShops.length} shops and ${sampleProducts.length} products`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed");
  }
};

// Run the seeding
connectDatabase();
setTimeout(seedDatabase, 2000); // Wait for connection to establish 