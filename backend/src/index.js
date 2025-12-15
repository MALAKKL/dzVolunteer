// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import express and cors
const express = require("express");
const cors = require("cors");

// Import Prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Initialize app BEFORE using routes
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./routes/authRoutes");
const missionRoutesOrg = require("./routes/missionRoutesOrg");
const missionRoutesPublic = require("./routes/missionRoutesPublic");

// Public mission routes
app.use("/api/missions", missionRoutesPublic);

// Organization-only mission routes
app.use("/api/organization/missions", missionRoutesOrg);

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Example route to get all volunteers along with their skills
app.get("/volunteers", async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany({
      include: { skills: true },
    });
    res.json(volunteers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
