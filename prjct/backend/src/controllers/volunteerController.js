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

module.exports = { getMyProfile, updateMyProfile, deleteMyAccount };
