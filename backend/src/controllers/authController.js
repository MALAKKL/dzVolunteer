const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT_SECRET = "supersecret"; // change for production

// REGISTER VOLUNTEER
exports.registerVolunteer = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const exists = await prisma.volunteer.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const volunteer = await prisma.volunteer.create({
      data: { firstName, lastName, email, password: hashed }
    });

    return res.json({ message: "Volunteer registered", volunteer });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


// REGISTER ORGANIZATION
exports.registerOrganization = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await prisma.organization.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const org = await prisma.organization.create({
      data: { name, email, password: hashed }
    });

    return res.json({ message: "Organization registered", org });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// LOGIN (volunteer or organization)
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

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
      { id: user.id, role: role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ message: "Logged in", token, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
