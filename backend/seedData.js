const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env" });

// Import models
const User = require("./model/user");
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

// Sample users data (students selling items)
const sampleUsers = [
  {
    name: "Alex Johnson",
    email: "alex.johnson@usf.edu",
    password: "Password123!",
    address: "4202 E Fowler Ave, Tampa, FL 33620",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    totalSales: 12,
  },
  {
    name: "Sarah Chen",
    email: "sarah.chen@usf.edu",
    password: "Password123!",
    address: "4202 E Fowler Ave, Tampa, FL 33620",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    totalSales: 8,
  },
  {
    name: "Mike Rodriguez",
    email: "mike.rodriguez@usf.edu",
    password: "Password123!",
    address: "4202 E Fowler Ave, Tampa, FL 33620",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    totalSales: 15,
  },
  {
    name: "Emily Davis",
    email: "emily.davis@usf.edu",
    password: "Password123!",
    address: "4202 E Fowler Ave, Tampa, FL 33620",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 4.6,
    totalSales: 6,
  },
  {
    name: "David Kim",
    email: "david.kim@usf.edu",
    password: "Password123!",
    address: "4202 E Fowler Ave, Tampa, FL 33620",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 4.5,
    totalSales: 10,
  },
];

// Sample marketplace items
const sampleItems = [
  {
    title: "Calculus Textbook - Stewart 8th Edition",
    description: "Used Calculus textbook in good condition. No highlighting, minimal wear. Perfect for MATH 2241. Includes access code.",
    category: "Books & Textbooks",
    condition: "Good",
    price: 45,
    negotiable: true,
    images: ["calc-textbook.jpg"],
    location: "USF Campus - Library",
    contactMethod: "Email",
    contactInfo: "alex.johnson@usf.edu",
    status: "Available",
    views: 23,
  },
  {
    title: "MacBook Air 2020 - 13 inch",
    description: "Excellent condition MacBook Air. 8GB RAM, 256GB SSD. Perfect for school work. Comes with charger and case.",
    category: "Electronics",
    condition: "Like New",
    price: 750,
    negotiable: true,
    images: ["macbook-air.jpg"],
    location: "USF Campus - MSC",
    contactMethod: "Email",
    contactInfo: "mike.rodriguez@usf.edu",
    status: "Available",
    views: 156,
  },
  {
    title: "IKEA Desk Chair - Ergonomic",
    description: "Comfortable office chair for long study sessions. Adjustable height and backrest. Great for dorm rooms.",
    category: "Furniture",
    condition: "Good",
    price: 80,
    negotiable: false,
    images: ["office-chair.jpg"],
    location: "USF Campus - Residence Halls",
    contactMethod: "Email",
    contactInfo: "mike.rodriguez@usf.edu",
    status: "Available",
    views: 34,
  },
  {
    title: "USF Bulls Football Jersey - Size L",
    description: "Authentic USF Bulls football jersey. Worn once to a game. Great for game days and showing school spirit.",
    category: "Clothing & Fashion",
    condition: "Like New",
    price: 35,
    negotiable: true,
    images: ["usf-jersey.jpg"],
    location: "USF Campus - Sun Dome",
    contactMethod: "Email",
    contactInfo: "sarah.chen@usf.edu",
    status: "Available",
    views: 67,
  },
  {
    title: "Bicycle - Mountain Bike",
    description: "Reliable mountain bike for campus transportation. Recently serviced, new tires. Includes lock and helmet.",
    category: "Vehicles & Transportation",
    condition: "Good",
    price: 120,
    negotiable: true,
    images: ["mountain-bike.jpg"],
    location: "USF Campus - Parking Garage",
    contactMethod: "Email",
    contactInfo: "emily.davis@usf.edu",
    status: "Available",
    views: 89,
  },
  {
    title: "Chemistry Lab Kit - Complete Set",
    description: "Full chemistry lab kit with safety goggles, lab coat, and all necessary equipment. Used for CHEM 2045.",
    category: "Other",
    condition: "Good",
    price: 60,
    negotiable: false,
    images: ["chem-lab-kit.jpg"],
    location: "USF Campus - Chemistry Building",
    contactMethod: "Email",
    contactInfo: "david.kim@usf.edu",
    status: "Available",
    views: 12,
  },
  {
    title: "Gaming Monitor - 24 inch 144Hz",
    description: "High refresh rate gaming monitor. Perfect for gaming and coding. Includes HDMI and DisplayPort cables.",
    category: "Electronics",
    condition: "Good",
    price: 180,
    negotiable: true,
    images: ["gaming-monitor.jpg"],
    location: "USF Campus - Engineering Building",
    contactMethod: "Email",
    contactInfo: "sarah.chen@usf.edu",
    status: "Available",
    views: 203,
  },
  {
    title: "Psychology Textbook - Myers 12th Edition",
    description: "Introduction to Psychology textbook. Some highlighting but in good condition. Perfect for PSY 2012.",
    category: "Books & Textbooks",
    condition: "Fair",
    price: 25,
    negotiable: true,
    images: ["psych-textbook.jpg"],
    location: "USF Campus - Psychology Building",
    contactMethod: "Email",
    contactInfo: "emily.davis@usf.edu",
    status: "Available",
    views: 45,
  },
  {
    title: "Mini Fridge - 3.2 cu ft",
    description: "Compact mini fridge perfect for dorm rooms. Works great, keeps drinks cold. Easy to transport.",
    category: "Home & Garden",
    condition: "Good",
    price: 90,
    negotiable: false,
    images: ["mini-fridge.jpg"],
    location: "USF Campus - Residence Halls",
    contactMethod: "Email",
    contactInfo: "mike.rodriguez@usf.edu",
    status: "Available",
    views: 78,
  },
  {
    title: "Yoga Mat - Premium Quality",
    description: "High-quality yoga mat with carrying strap. Used for fitness classes. Non-slip surface, great condition.",
    category: "Sports & Fitness",
    condition: "Like New",
    price: 20,
    negotiable: false,
    images: ["yoga-mat.jpg"],
    location: "USF Campus - Recreation Center",
    contactMethod: "Email",
    contactInfo: "mike.rodriguez@usf.edu",
    status: "Available",
    views: 29,
  },
  {
    title: "Coffee Maker - Keurig K-Mini",
    description: "Compact Keurig coffee maker. Perfect for dorm rooms. Includes reusable K-cup and cleaning supplies.",
    category: "Home & Garden",
    condition: "Good",
    price: 40,
    negotiable: true,
    images: ["coffee-maker.jpg"],
    location: "USF Campus - Library",
    contactMethod: "Email",
    contactInfo: "emily.davis@usf.edu",
    status: "Available",
    views: 56,
  },
  {
    title: "Backpack - North Face Recon",
    description: "Durable North Face backpack. Multiple compartments, laptop sleeve. Great for carrying books and laptop.",
    category: "Clothing & Fashion",
    condition: "Good",
    price: 50,
    negotiable: true,
    images: ["backpack.jpg"],
    location: "USF Campus - MSC",
    contactMethod: "Email",
    contactInfo: "david.kim@usf.edu",
    status: "Available",
    views: 91,
  },
  {
    title: "Tutoring Services - Math & Physics",
    description: "Experienced tutor offering help with Calculus, Physics, and other STEM courses. Flexible scheduling.",
    category: "Services",
    condition: "New",
    price: 25,
    negotiable: true,
    images: ["tutoring.jpg"],
    location: "USF Campus - Library Study Rooms",
    contactMethod: "Email",
    contactInfo: "alex.johnson@usf.edu",
    status: "Available",
    views: 134,
  },
  {
    title: "Printer - HP LaserJet",
    description: "Reliable laser printer. Great for printing assignments and papers. Includes extra toner cartridges.",
    category: "Electronics",
    condition: "Good",
    price: 70,
    negotiable: false,
    images: ["printer.jpg"],
    location: "USF Campus - Engineering Building",
    contactMethod: "Email",
    contactInfo: "david.kim@usf.edu",
    status: "Available",
    views: 42,
  },
  {
    title: "USF Parking Pass - Spring Semester",
    description: "Valid USF parking pass for Spring semester. Can be transferred to your account. Saves money on parking.",
    category: "Other",
    condition: "New",
    price: 150,
    negotiable: true,
    images: ["parking-pass.jpg"],
    location: "USF Campus - Parking Services",
    contactMethod: "Email",
    contactInfo: "alex.johnson@usf.edu",
    status: "Available",
    views: 167,
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");
    
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      createdUsers.push(user);
      console.log(`Created user: ${user.name}`);
    }

    // Create items and assign to users
    const itemsPerUser = Math.ceil(sampleItems.length / createdUsers.length);

    for (let i = 0; i < sampleItems.length; i++) {
      const userIndex = Math.floor(i / itemsPerUser);
      const user = createdUsers[userIndex];

                   const itemData = {
               ...sampleItems[i],
               sellerId: user._id,
               seller: {
                 name: user.name,
                 email: user.email,
                 avatar: user.avatar,
                 rating: user.rating,
                 totalSales: user.totalSales,
                 memberSince: user.createdAt,
               }
             };
      
      const product = await Product.create(itemData);
      console.log(`Created item: ${product.title} by ${user.name}`);
    }

    console.log("Database seeding completed successfully!");
    console.log(`Created ${createdUsers.length} users and ${sampleItems.length} items`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed");
  }
};

connectDatabase();
setTimeout(seedDatabase, 2000); 