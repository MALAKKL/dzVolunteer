const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Verify volunteer skill
exports.verifySkill = async (req, res) => {
  try {
    const { volunteerSkillId, status } = req.body;
    if (!["VERIFIED", "REJECTED"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const updated = await prisma.volunteerSkill.update({
      where: { id: volunteerSkillId },
      data: { status, verifiedAt: new Date(), verifiedBy: req.user.id }
    });

    res.json({ message: "Skill verification updated", updated });
  } catch (err) {
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
