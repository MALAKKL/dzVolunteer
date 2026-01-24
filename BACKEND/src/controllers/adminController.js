const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Verify volunteer skill
exports.verifySkill = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["VERIFIED", "REJECTED"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    console.log(`Admin API: Verifying skill ${id} with status ${status} by admin ${req.user.id}`);

    const updated = await prisma.volunteerSkill.update({
      where: { id },
      data: {
        status,
        verifiedAt: new Date(),
        verifiedBy: req.user.id === "admin" ? null : req.user.id // Handle virtual admin
      }
    });

    res.json({ message: "Skill verification updated", updated });
  } catch (err) {
    console.error("Admin API Error (verifySkill):", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete spam account (volunteer/org)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- New Admin Methods ---

// Get all volunteers
exports.getAllVolunteers = async (req, res) => {
  try {
    console.log("Admin API: Fetching all volunteers...");
    const volunteers = await prisma.volunteer.findMany({
      include: {
        user: { select: { id: true, email: true, createdAt: true, role: true } },
        skills: { include: { skill: true } }
      }
    });
    console.log(`Admin API: Found ${volunteers.length} volunteers`);
    res.json(volunteers);
  } catch (err) {
    console.error("Admin API Error (volunteers):", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    console.log("Admin API: Fetching all organizations...");
    const organizations = await prisma.organization.findMany({
      include: {
        user: { select: { id: true, email: true, createdAt: true, role: true } }
      }
    });
    console.log(`Admin API: Found ${organizations.length} organizations`);
    res.json(organizations);
  } catch (err) {
    console.error("Admin API Error (organizations):", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all users (To find spam/incomplete profiles)
exports.getAllUsers = async (req, res) => {
  try {
    console.log("Admin API: Fetching all users for spam check...");
    const users = await prisma.user.findMany({
      include: {
        volunteer: true,
        organization: true
      }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get pending skill verifications
exports.getPendingSkills = async (req, res) => {
  try {
    const pendingSkills = await prisma.volunteerSkill.findMany({
      where: { status: "PENDING" },
      include: {
        skill: true,
        volunteer: { select: { firstName: true, lastName: true } }
      }
    });
    res.json(pendingSkills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
