const { body, validationResult } = require("express-validator");

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// User registration validation
const validateUserRegistration = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phoneNumber")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("address")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),
  handleValidationErrors
];

// Shop registration validation
const validateShopRegistration = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Shop name must be between 2 and 100 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phoneNumber")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("address")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),
  body("zipCode")
    .isPostalCode("US")
    .withMessage("Please provide a valid US zip code"),
  handleValidationErrors
];

// Product creation validation
const validateProductCreation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Product name must be between 2 and 100 characters"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),
  body("category")
    .trim()
    .isIn(["Electronics", "Fashion", "Home & Garden", "Sports & Fitness", "Books", "Other"])
    .withMessage("Please select a valid category"),
  body("originalPrice")
    .isFloat({ min: 0 })
    .withMessage("Original price must be a positive number"),
  body("discountPrice")
    .isFloat({ min: 0 })
    .withMessage("Discount price must be a positive number"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  handleValidationErrors
];

// Login validation
const validateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
  handleValidationErrors
];

// Order creation validation
const validateOrderCreation = [
  body("cart")
    .isArray({ min: 1 })
    .withMessage("Cart must contain at least one item"),
  body("cart.*.productId")
    .isMongoId()
    .withMessage("Invalid product ID"),
  body("cart.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  body("shippingAddress")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Shipping address must be between 10 and 200 characters"),
  body("phoneNumber")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  handleValidationErrors
];

// Review creation validation
const validateReviewCreation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Comment must be between 10 and 500 characters"),
  body("productId")
    .isMongoId()
    .withMessage("Invalid product ID"),
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateShopRegistration,
  validateProductCreation,
  validateLogin,
  validateOrderCreation,
  validateReviewCreation,
  handleValidationErrors
}; 