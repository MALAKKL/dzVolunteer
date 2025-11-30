// src/controllers/volunteerController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all volunteers with skills
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany({
      include: { skills: true },
    });
    res.json(volunteers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getVolunteers,
};
