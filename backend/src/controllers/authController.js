require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Use JWT secret from .env
const JWT_SECRET = process.env.JWT_SECRET;

// ========================
// REGISTER VOLUNTEER
// ========================
exports.registerVolunteer = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if email already exists
    const exists = await prisma.volunteer.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create volunteer
    const volunteer = await prisma.volunteer.create({
      data: { firstName, lastName, email, password: hashed },
    });

    // Remove password before sending response
    const { password: _, ...safeVolunteer } = volunteer;

    return res.status(201).json({
      message: "Volunteer registered",
      volunteer: safeVolunteer,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ========================
// REGISTER ORGANIZATION
// ========================
exports.registerOrganization = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const exists = await prisma.organization.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create organization
    const org = await prisma.organization.create({
      data: { name, email, password: hashed },
    });

    // Remove password before sending response
    const { password: _, ...safeOrg } = org;

    return res.status(201).json({
      message: "Organization registered",
      organization: safeOrg,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ========================
// LOGIN (volunteer or organization)
// ========================
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate role
    if (!["volunteer", "organization"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Find user
    const user =
      role === "volunteer"
        ? await prisma.volunteer.findUnique({ where: { email } })
        : await prisma.organization.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: "7d" });

    // Remove password before sending response
    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      message: "Logged in",
      token,
      user: safeUser,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
