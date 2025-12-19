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

    const exists = await prisma.volunteer.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const volunteer = await prisma.volunteer.create({
      data: { firstName, lastName, email, password: hashed },
    });

    const { password: _, ...safeVolunteer } = volunteer;

    res.status(201).json({
      message: "Volunteer registered",
      volunteer: safeVolunteer,
    });
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

    const exists = await prisma.organization.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const org = await prisma.organization.create({
      data: { name, email, password: hashed },
    });

    const { password: _, ...safeOrg } = org;

    res.status(201).json({
      message: "Organization registered",
      organization: safeOrg,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ========================
// LOGIN (volunteer or organization)
// ========================
// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // ADMIN LOGIN
    if (email === process.env.ADMIN_EMAIL) {
      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Invalid admin credentials" });
      }

      const token = jwt.sign(
        { id: "admin", role: "admin" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Admin logged in",
        token,
        user: { email, role: "admin" },
      });
    }

    // NORMAL USERS
    if (!["volunteer", "organization"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user =
      role === "volunteer"
        ? await prisma.volunteer.findUnique({ where: { email } })
        : await prisma.organization.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...safeUser } = user;

    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//forgot password
const crypto = require("crypto");

exports.forgotPassword = async (req, res) => {
  const { email, role } = req.body;

  if (!["volunteer", "organization"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user =
    role === "volunteer"
      ? await prisma.volunteer.findUnique({ where: { email } })
      : await prisma.organization.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token before saving
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  if (role === "volunteer") {
    await prisma.volunteer.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: expiry,
      },
    });
  } else {
    await prisma.organization.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: expiry,
      },
    });
  }

  // TEMP: return token (later you send email)
  res.json({
    message: "Password reset token generated",
    resetToken,
  });
};

//reset password
exports.resetPassword = async (req, res) => {
  const { token, newPassword, role } = req.body;

  if (newPassword.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
    });
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user =
    role === "volunteer"
      ? await prisma.volunteer.findFirst({
          where: {
            resetToken: hashedToken,
            resetTokenExpiry: { gt: new Date() },
          },
        })
      : await prisma.organization.findFirst({
          where: {
            resetToken: hashedToken,
            resetTokenExpiry: { gt: new Date() },
          },
        });

  if (!user) {
    return res.status(400).json({ message: "Token invalid or expired" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  if (role === "volunteer") {
    await prisma.volunteer.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
  } else {
    await prisma.organization.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
  }

  res.json({ message: "Password reset successful" });
};
