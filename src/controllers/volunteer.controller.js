

const prisma = require('../prismaClient');
const { updateProfileSchema } = require('../utils/validators');

// GET /api/volunteers/me
async function getMyProfile(req, res) {
  try {
    const id = req.user.id;
    const user = await prisma.volunteer.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: 'Profil introuvable' });
    const { password, ...safe } = user;
    res.json(safe);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Erreur serveur' });
  }
}

// PATCH /api/volunteers/me
async function updateMyProfile(req, res) {
  const { error } = updateProfileSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    const id = req.user.id;
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
    const id = req.user.id;
    await prisma.volunteer.delete({ where: { id } });
    res.json({ message: 'Compte supprimé' });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = { getMyProfile, updateMyProfile, deleteMyAccount };
