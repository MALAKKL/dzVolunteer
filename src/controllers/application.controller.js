const prisma = require('../prismaClient');

// volunteer applies to mission (auth required)
async function applyToMission(req, res) {
  try {
    const volunteerId = req.user.id;
    const missionId = Number(req.params.missionId);

    // check mission exists & published
    const mission = await prisma.mission.findUnique({ where: { id: missionId } });
    if (!mission || mission.status !== 'published') {
      return res.status(400).json({ message: 'Mission non disponible' });
    }

    
    const existing = await prisma.application.findUnique({
      where: { missionId_volunteerId: { missionId, volunteerId } } 
    }).catch(() => null);

    if (existing) return res.status(400).json({ message: 'Vous avez déjà postulé' });

    const application = await prisma.application.create({
      data: { missionId, volunteerId }
    });
    res.status(201).json(application);
  } catch (err) {
    // if unique constraint violation arrive, handle
    if (err.code === 'P2002') return res.status(400).json({ message: 'Vous avez déjà postulé' });
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = { applyToMission };
