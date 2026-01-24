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

    const photoPath = `/uploads/volunteers/${req.file.filename}`;

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

module.exports = { getVolunteers, getMyProfile, updateMyProfile, deleteMyAccount, uploadVolunteerPhoto, getTopVolunteers };
