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

const passport = require("passport");
require("./config/passport");

app.use(passport.initialize());


// Import routes
const authRoutes = require("./routes/authRoutes");
const missionRoutesOrg = require("./routes/missionRoutesOrg");
const missionRoutesPublic = require("./routes/missionRoutesPublic");
const organizationRoutes = require("./routes/organizationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sdgRoutes = require("./routes/sdgRoutes");
const missionRoutes = require('./routes/missionRoutes');
const applicationRoutes = require("./routes/applicationRoutes");



// Public mission routes (Includes search)
app.use("/api/missions", missionRoutesPublic);

// Organization-only mission routes
app.use("/api/organization/missions", missionRoutesOrg);

// Organization routes (view/update profile)
app.use("/api/organizations", organizationRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Public SDGs
app.use("/api/sdgs", sdgRoutes);

// Application routes (Apply, My Applications)
app.use("/api/applications", applicationRoutes);

// Private volunteer mission actions (like archiving)
app.use('/api/volunteer/missions', missionRoutes);


app.use("/uploads", express.static("uploads"));

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
