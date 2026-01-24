// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import express and cors
const express = require("express");
const cors = require("cors");

// Import Prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ensure virtual admin has a record in database
async function initAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@dzvolunteer.com";
    const adminExists = await prisma.user.findFirst({
      where: { OR: [{ id: "admin" }, { email: adminEmail }] }
    });

    if (!adminExists) {
      console.log("🛠️ Initializing system admin record...");
      await prisma.user.create({
        data: {
          id: "admin",
          email: adminEmail,
          role: "ADMIN",
          firstName: "System",
          lastName: "Admin"
        }
      });
    } else if (adminExists.id !== "admin") {
      // If it exists but has a different ID (auto-generated), update it to "admin" 
      // to match our virtual user ID logic if we want consistency, 
      // but it's safer to just log it.
      console.log(`🛠️ Admin record exists with email ${adminEmail} (ID: ${adminExists.id})`);
    } else {
      console.log("🛠️ System admin record is ready.");
    }
  } catch (e) {
    console.error("Admin initialization failed:", e.message);
  }
}

async function seedInitialSkills() {
  try {
    const count = await prisma.skill.count();
    if (count === 0) {
      console.log("🌱 Database is empty. Seeding essential skills...");
      const skills = [
        { name: "SDG 1: No Poverty", description: "Economic empowerment and support", requiresVerification: false },
        { name: "SDG 2: Zero Hunger", description: "Food security and aid", requiresVerification: false },
        { name: "SDG 3: Good Health", description: "Medical and health advocacy", requiresVerification: true },
        { name: "SDG 4: Quality Education", description: "Teaching and literacy", requiresVerification: true },
        { name: "First Aid & CPR", description: "Emergency medical response", requiresVerification: true },
        { name: "Graphic Design", description: "Digital content creation", requiresVerification: true },
        { name: "Web Development", description: "Frontend and Backend development", requiresVerification: true }
      ];
      await prisma.skill.createMany({ data: skills });
      console.log("✅ Seeded 7 essential skills.");
    }
  } catch (e) {
    console.error("Skill seeding failed:", e.message);
  }
}

initAdmin().then(seedInitialSkills);

// Initialize app BEFORE using routes
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Internal Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

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
const volunteerRoutes = require("./routes/volunteerRoutes");
const skillRoutes = require("./routes/skillRoutes");

// Public mission routes (Includes search)
app.use("/api/missions", missionRoutesPublic);

// Volunteer-only actions (profile, skills)
app.use("/api/volunteers", volunteerRoutes);

// Skill catalog
app.use("/api/skills", skillRoutes);

// Organization-only mission routes
app.use("/api/organization/missions", missionRoutesOrg);

// Organization routes (profile management, photo, validation)
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

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// JSON 404 Handler (Keep this after all routes)
app.use((req, res) => {
  const msg = `404 - ${req.method} ${req.originalUrl} not found. Registered routes: /api/missions, /api/volunteers, /api/skills, etc.`;
  console.warn(`[404] ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: "Resource not found",
    message: msg,
    tip: "Make sure you are calling the correct URL and that the route is registered."
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    path: req.originalUrl
  });
});

// Final Server Config
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
