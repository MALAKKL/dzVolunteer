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

//volunteers  side


// GET /api/volunteers/me
async function getMyProfile(req, res) {
  try {
    const id = req.user.volunteer.id;
    const user = await prisma.volunteer.findUnique({ where: { id }, include: { user: true } });
    if (!user) return res.status(404).json({ message: 'Profil introuvable' });
    const { user: userData, ...safe } = user;
    res.json(safe);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Erreur serveur' });
  }
}

// PATCH /api/volunteers/me
async function updateMyProfile(req, res) {
  try {
    const id = req.user.volunteer.id;
    const updateData = { ...req.body };
    // block email/password updates here
    delete updateData.email;
    delete updateData.password;
    const updated = await prisma.volunteer.update({ where: { id }, data: updateData });
    const { password, ...safe } = updated;
    res.json(safe);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Erreur serveur' });
  }
}

// DELETE /api/volunteers/me
async function deleteMyAccount(req, res) {
  try {
    const id = req.user.volunteer.id;
    await prisma.user.delete({ where: { id: req.user.id } });
    res.json({ message: 'Compte supprimé' });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Upload profile photo
async function uploadVolunteerPhoto(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // If using Cloudinary, path is in req.file.path. If local, it's the filename.
    const photoPath = req.file.path.startsWith('http')
      ? req.file.path
      : `/uploads/volunteers/${req.file.filename}`;

    await prisma.volunteer.update({
      where: { id: req.user.volunteer.id },
      data: { photo: photoPath },
    });

    res.json({
      message: "Profile photo uploaded successfully",
      photo: photoPath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

// Get top volunteers by hours
async function getTopVolunteers(req, res) {
  try {
    const topVolunteers = await prisma.volunteer.findMany({
      take: 4,
      orderBy: { totalHoursVolunteered: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        photo: true,
        totalHoursVolunteered: true
      }
    });
    res.json(topVolunteers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching top volunteers" });
  }
}

// Add skill with certificate (V2 with better checks)
async function addSkillWithCertificate(req, res) {
  try {
    console.log("--> POST /api/volunteers/skills reached");
    console.log("Body:", req.body);
    console.log("File:", req.file ? req.file.filename : "No file");

    const { skillId } = req.body;

    if (!req.user || !req.user.volunteer) {
      return res.status(401).json({ error: "Volunteer profile required." });
    }

    const volunteerId = req.user.volunteer.id;

    if (!skillId) {
      return res.status(400).json({ error: "Skill ID is required." });
    }

    // Check if skill exists in catalog
    const skillExists = await prisma.skill.findUnique({ where: { id: skillId } });
    if (!skillExists) {
      console.error(`Skill Addition Error: Skill ${skillId} not found in catalog`);
      return res.status(404).json({ message: "The selected skill does not exist in our catalog." });
    }

    // Check if skill already exists for this volunteer
    const existing = await prisma.volunteerSkill.findUnique({
      where: { volunteerId_skillId: { volunteerId, skillId } }
    });

    if (existing) {
      console.warn(`Skill Addition: Volunteer ${volunteerId} already has skill ${skillId}`);
      return res.status(400).json({ message: "Skill already added to your profile" });
    }

    const certificatePath = req.file ? (req.file.path.startsWith('http') ? req.file.path : `/uploads/certificates/${req.file.filename}`) : null;

    console.log(`Skill Addition: Creating record for V:${volunteerId}, S:${skillId}`);
    const volunteerSkill = await prisma.volunteerSkill.create({
      data: {
        volunteerId,
        skillId,
        certificate: certificatePath,
        status: "PENDING"
      },
      include: { skill: true }
    });

    console.log("Skill Addition Success!");
    res.status(201).json(volunteerSkill);
  } catch (error) {
    console.error("Detailed Skill Addition Crash:", error);
    res.status(500).json({ error: error.message || "Internal server error during skill addition" });
  }
}

module.exports = {
  getVolunteers,
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
  uploadVolunteerPhoto,
  getTopVolunteers,
  addSkillWithCertificate
};
