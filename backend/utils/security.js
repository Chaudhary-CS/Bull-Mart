const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// Generate secure random token
const generateSecureToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

// Hash password with configurable salt rounds
const hashPassword = async (password, saltRounds = 12) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error(`Password hashing failed: ${error.message}`);
  }
};

// Compare password with hash
const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error(`Password comparison failed: ${error.message}`);
  }
};

// Generate password reset token
const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  const resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

  return {
    resetToken,
    hashedToken,
    resetTokenExpiry
  };
};

// Validate password strength
const validatePasswordStrength = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, ""); // Remove event handlers
};

// Generate API key
const generateApiKey = () => {
  const prefix = "bulls_mart";
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(16).toString("hex");
  return `${prefix}_${timestamp}_${random}`;
};

// Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (US format)
const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

// Generate secure file name
const generateSecureFileName = (originalName) => {
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString("hex");
  const extension = originalName.split(".").pop();
  return `${timestamp}_${random}.${extension}`;
};

// Rate limiting helper
const createRateLimitKey = (identifier, action) => {
  return `rate_limit:${action}:${identifier}`;
};

// CSRF token generation
const generateCSRFToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Validate CSRF token
const validateCSRFToken = (token, storedToken) => {
  return token && storedToken && token === storedToken;
};

// Encrypt sensitive data
const encryptData = (data, secretKey) => {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(secretKey, "salt", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, key);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

// Decrypt sensitive data
const decryptData = (encryptedData, secretKey) => {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(secretKey, "salt", 32);
  const parts = encryptedData.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encrypted = parts[1];
  const decipher = crypto.createDecipher(algorithm, key);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Session token generation
const generateSessionToken = (userId) => {
  const payload = {
    userId,
    timestamp: Date.now(),
    random: crypto.randomBytes(16).toString("hex")
  };
  return crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
};

module.exports = {
  generateSecureToken,
  hashPassword,
  comparePassword,
  generatePasswordResetToken,
  validatePasswordStrength,
  sanitizeInput,
  generateApiKey,
  validateEmail,
  validatePhoneNumber,
  generateSecureFileName,
  createRateLimitKey,
  generateCSRFToken,
  validateCSRFToken,
  encryptData,
  decryptData,
  generateSessionToken
}; 