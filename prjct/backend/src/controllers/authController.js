require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;

// ========================
// REGISTER VOLUNTEER
// ========================
exports.registerVolunteer = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters" });

    // Check if user already exists
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    // Create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "VOLUNTEER",
        firstName,
        lastName,
      },
    });

    // Create the volunteer profile
    const volunteer = await prisma.volunteer.create({
      data: {
        userId: user.id,
        firstName,
        lastName,
      },
      include: { user: true },
    });

    res.status(201).json({ message: "Volunteer registered", volunteer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ========================
// REGISTER ORGANIZATION
// ========================
exports.registerOrganization = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters" });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    // Create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "ORGANIZATION",
        firstName: name, // just store name as firstName for simplicity
      },
    });

    // Create the organization profile
    const org = await prisma.organization.create({
      data: {
        userId: user.id,
        name,
      },
      include: { user: true },
    });

    res.status(201).json({ message: "Organization registered", organization: org });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ========================
// LOGIN (VOLUNTEER / ORG / ADMIN)
// ========================
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password and role are required" });
    }

    // ADMIN LOGIN
    if (email === process.env.ADMIN_EMAIL) {
      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Invalid admin credentials" });
      }

      const token = jwt.sign({ id: "admin", role: "ADMIN" }, JWT_SECRET, { expiresIn: "7d" });

      return res.json({ message: "Admin logged in", token, user: { email, role: "ADMIN" } });
    }

    if (!["volunteer", "organization"].includes(role.toLowerCase())) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Fetch user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        volunteer: true,
        organization: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check role matches
    if ((role.toLowerCase() === "volunteer" && user.role !== "VOLUNTEER") ||
        (role.toLowerCase() === "organization" && user.role !== "ORGANIZATION")) {
      return res.status(403).json({ message: "Role mismatch" });
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    // Send user profile without password
    const { password: _, ...safeUser } = user;

    res.json({ message: "Login successful", token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ========================
// GOOGLE AUTH (VOLUNTEER / ORG)
// ========================
exports.googleAuth = async (req, res) => {
  try {
    const { credential, role } = req.body;

    if (!credential || !role) return res.status(400).json({ message: "Credential and role required" });
    if (!["volunteer", "organization"].includes(role)) return res.status(400).json({ message: "Invalid role" });

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const firstName = payload.given_name;
    const lastName = payload.family_name;
    const avatarUrl = payload.picture;
    const googleId = payload.sub;

    let user =
      role === "volunteer"
        ? await prisma.volunteer.findFirst({ where: { email } })
        : await prisma.organization.findFirst({ where: { email } });

    if (!user) {
      // Create new user
      if (role === "volunteer") {
        user = await prisma.volunteer.create({
          data: { firstName, lastName, email, googleId, avatarUrl },
        });
      } else {
        user = await prisma.organization.create({
          data: { name: firstName + " " + lastName, email, googleId, avatarUrl },
        });
      }
    }

    const token = jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: "7d" });
    const { password: _, ...safeUser } = user;

    res.json({ message: "Google login successful", token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========================
// FORGOT PASSWORD
// ========================
exports.forgotPassword = async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!email || !role || !["volunteer", "organization"].includes(role))
      return res.status(400).json({ message: "Invalid request" });

    const user =
      role === "volunteer"
        ? await prisma.volunteer.findUnique({ where: { email } })
        : await prisma.organization.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    if (role === "volunteer") {
      await prisma.volunteer.update({ where: { email }, data: { resetToken: hashedToken, resetTokenExpiry: expiry } });
    } else {
      await prisma.organization.update({ where: { email }, data: { resetToken: hashedToken, resetTokenExpiry: expiry } });
    }

    // TODO: send email with resetToken
    res.json({ message: "Password reset token generated", resetToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========================
// RESET PASSWORD
// ========================
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword, role } = req.body;

    if (!token || !newPassword || !role || !["volunteer", "organization"].includes(role))
      return res.status(400).json({ message: "Invalid request" });

    if (newPassword.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user =
      role === "volunteer"
        ? await prisma.volunteer.findFirst({ where: { resetToken: hashedToken, resetTokenExpiry: { gt: new Date() } } })
        : await prisma.organization.findFirst({ where: { resetToken: hashedToken, resetTokenExpiry: { gt: new Date() } } });

    if (!user) return res.status(400).json({ message: "Token invalid or expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (role === "volunteer") {
      await prisma.volunteer.update({ where: { id: user.id }, data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null } });
    } else {
      await prisma.organization.update({ where: { id: user.id }, data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null } });
    }

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// getprofile
exports.getProfile = async (req, res) => {
  try {
    // req.user is already attached by authenticate middleware
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Failed to load profile" });
  }
};
