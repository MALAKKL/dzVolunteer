// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import express and cors
const express = require("express");
const cors = require("cors");

// Import Prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Import routes
const authRoutes = require("./routes/authRoutes");

const missionRoutes = require("./routes/missionRoutes");
app.use("/api/missions", missionRoutes);

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
