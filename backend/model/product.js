const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter your item title!"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter your item description!"],
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  category: {
    type: String,
    required: [true, "Please select a category!"],
    enum: [
      "Electronics",
      "Books & Textbooks", 
      "Furniture",
      "Clothing & Fashion",
      "Sports & Fitness",
      "Home & Garden",
      "Vehicles & Transportation",
      "Services",
      "Other"
    ],
  },
  condition: {
    type: String,
    required: [true, "Please select the item condition!"],
    enum: ["New", "Like New", "Good", "Fair", "Poor"],
  },
  price: {
    type: Number,
    required: [true, "Please enter your asking price!"],
    min: [0, "Price cannot be negative"],
  },
  negotiable: {
    type: Boolean,
    default: false,
  },
  images: [
    {
      type: String,
      required: [true, "Please upload at least one image!"],
    },
  ],
  location: {
    type: String,
    required: [true, "Please enter your location!"],
    default: "USF Campus",
  },
  contactMethod: {
    type: String,
    required: [true, "Please select your preferred contact method!"],
    enum: ["Phone", "Email", "Text", "WhatsApp"],
  },
  contactInfo: {
    type: String,
    required: [true, "Please provide your contact information!"],
  },
  
  // Seller information (replacing shop concept)
  sellerId: {
    type: String,
    required: true,
  },
  seller: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    avatar: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
  },

  // Status tracking
  status: {
    type: String,
    enum: ["Available", "Pending", "Sold", "Expired"],
    default: "Available",
  },
  
  // Views and interest
  views: {
    type: Number,
    default: 0,
  },
  favorites: [{
    userId: {
      type: String,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  
  // Reviews and ratings
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        maxlength: 500,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    default: function() {
      // Items expire after 30 days
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
      return expiry;
    },
  },
});

// Update the updatedAt field before saving
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Calculate average rating
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRating / this.reviews.length;
  }
  return this.averageRating;
};

// Check if item is expired
productSchema.methods.isExpired = function() {
  return new Date() > this.expiresAt;
};

// Increment view count
productSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model("Product", productSchema);
