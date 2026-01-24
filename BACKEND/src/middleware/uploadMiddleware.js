const multer = require("multer");
const path = require("path");

const fs = require('fs');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/organizations";

    // Check role or path to determine folder
    if (req.user?.role === "VOLUNTEER" || req.originalUrl.includes("volunteer")) {
      folder = "uploads/volunteers";
    }

    // Ensure directory exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// File filter (images only)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const uploadOrgPhoto = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = uploadOrgPhoto;
