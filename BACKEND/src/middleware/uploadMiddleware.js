const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require("path");
const fs = require('fs');

// 1. Check if Cloudinary is configured
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

let storage;

if (isCloudinaryConfigured) {
  // Cloudinary Storage
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'dzVolunteer',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
  });
  console.log("☁️  Cloudinary storage selected");
} else {
  // Local Disk Storage (Fallback)
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let folder = "uploads/organizations";
      if (req.user?.role === "VOLUNTEER" || req.originalUrl.includes("volunteer")) {
        if (req.originalUrl.includes("skill")) {
          folder = "uploads/certificates";
        } else {
          folder = "uploads/volunteers";
        }
      } else if (req.originalUrl.includes("mission")) {
        folder = "uploads/missions";
      }

      if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    },
  });
  console.log("💾 Local disk storage selected");
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
