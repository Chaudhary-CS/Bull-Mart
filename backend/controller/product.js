const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

// Create new item listing
router.post(
  "/create-listing",
  upload.array("images"),
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return next(new ErrorHandler("Please upload at least one image!", 400));
      }

      const imageUrls = files.map((file) => `${file.filename}`);

      const listingData = {
        ...req.body,
        images: imageUrls,
        sellerId: req.user._id,
        seller: {
          name: req.user.name,
          email: req.user.email,
          phoneNumber: req.user.phoneNumber,
          avatar: req.user.avatar,
          rating: req.user.rating || 0,
          totalSales: req.user.totalSales || 0,
          memberSince: req.user.createdAt,
        },
      };

      const product = await Product.create(listingData);

      res.status(201).json({
        success: true,
        message: "Item listed successfully!",
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all listings with filters
router.get(
  "/get-all-listings",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        category,
        condition,
        minPrice,
        maxPrice,
        location,
        negotiable,
        status = "Available",
        sortBy = "createdAt",
        sortOrder = "desc",
        page = 1,
        limit = 20,
      } = req.query;

      // Build filter object
      const filter = { status };
      
      if (category) filter.category = category;
      if (condition) filter.condition = condition;
      if (location) filter.location = { $regex: location, $options: "i" };
      if (negotiable !== undefined) filter.negotiable = negotiable === "true";
      
      // Price range filter
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }

      // Pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Sorting
      const sort = {};
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;

      const products = await Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate("sellerId", "name avatar rating totalSales");

      const total = await Product.countDocuments(filter);

      res.status(200).json({
        success: true,
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit),
        },
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get user's listings
router.get(
  "/my-listings",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ sellerId: req.user._id })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get single listing with view increment
router.get(
  "/listing/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate("sellerId", "name avatar rating totalSales memberSince");

      if (!product) {
        return next(new ErrorHandler("Listing not found!", 404));
      }

      // Increment view count
      await product.incrementViews();

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Update listing
router.put(
  "/update-listing/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Listing not found!", 404));
      }

      if (product.sellerId.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You can only update your own listings!", 403));
      }

      // Handle image updates if provided
      if (req.files && req.files.length > 0) {
        // Delete old images
        product.images.forEach((imageUrl) => {
          const filePath = `uploads/${imageUrl}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });

        // Add new images
        const imageUrls = req.files.map((file) => file.filename);
        req.body.images = imageUrls;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        message: "Listing updated successfully!",
        product: updatedProduct,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Delete listing
router.delete(
  "/delete-listing/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Listing not found!", 404));
      }

      if (product.sellerId.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You can only delete your own listings!", 403));
      }

      // Delete images
      product.images.forEach((imageUrl) => {
        const filePath = `uploads/${imageUrl}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Listing deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Mark item as sold
router.put(
  "/mark-sold/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Listing not found!", 404));
      }

      if (product.sellerId.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You can only mark your own listings as sold!", 403));
      }

      product.status = "Sold";
      await product.save();

      res.status(200).json({
        success: true,
        message: "Item marked as sold!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Add/remove from favorites
router.post(
  "/toggle-favorite/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Listing not found!", 404));
      }

      const existingFavorite = product.favorites.find(
        (fav) => fav.userId.toString() === req.user._id.toString()
      );

      if (existingFavorite) {
        // Remove from favorites
        product.favorites = product.favorites.filter(
          (fav) => fav.userId.toString() !== req.user._id.toString()
        );
        await product.save();

        res.status(200).json({
          success: true,
          message: "Removed from favorites!",
          isFavorited: false,
        });
      } else {
        // Add to favorites
        product.favorites.push({
          userId: req.user._id,
          addedAt: new Date(),
        });
        await product.save();

        res.status(200).json({
          success: true,
          message: "Added to favorites!",
          isFavorited: true,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get user's favorites
router.get(
  "/my-favorites",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({
        "favorites.userId": req.user._id,
      }).sort({ "favorites.addedAt": -1 });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Create review for a purchased item
router.post(
  "/create-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { rating, comment, productId } = req.body;

      const product = await Product.findById(productId);

      if (!product) {
        return next(new ErrorHandler("Listing not found!", 404));
      }

      // Check if user has already reviewed this item
      const existingReview = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (existingReview) {
        return next(new ErrorHandler("You have already reviewed this item!", 400));
      }

      const review = {
        user: req.user,
        rating,
        comment,
      };

      product.reviews.push(review);
      product.calculateAverageRating();
      await product.save();

      res.status(200).json({
        success: true,
        message: "Review submitted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get listings by category
router.get(
  "/category/:category",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({
        category: req.params.category,
        status: "Available",
      })
        .sort({ createdAt: -1 })
        .populate("sellerId", "name avatar rating");

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Search listings
router.get(
  "/search",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { q, category, minPrice, maxPrice, condition } = req.query;

      const filter = { status: "Available" };

      if (q) {
        filter.$or = [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ];
      }

      if (category) filter.category = category;
      if (condition) filter.condition = condition;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }

      const products = await Product.find(filter)
        .sort({ createdAt: -1 })
        .populate("sellerId", "name avatar rating");

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Admin: Get all listings
router.get(
  "/admin-all-listings",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find()
        .sort({ createdAt: -1 })
        .populate("sellerId", "name email");

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
