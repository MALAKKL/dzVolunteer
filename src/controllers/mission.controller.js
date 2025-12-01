const prisma = require('../prismaClient');
const { missionCreateSchema } = require('../utils/validators');







async function archiveMission(req, res) {
  try {
    const id = Number(req.params.id);
    const mission = await prisma.mission.update({ where: { id }, data: { status: 'archived' } });
    res.json(mission);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Erreur serveur' });
  }
}

// search: q (keyword), city
async function searchMissions(req, res) {
  try {
    const { q, city } = req.query;
    const where = {
      status: 'published',
      AND: []
    };
    if (q) {
      where.AND.push({
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      });
    }
    if (city) {
      where.AND.push({ location: { equals: city, mode: 'insensitive' } });
    }
    // if no conditions besides status, remove AND
    if (where.AND.length === 0) delete where.AND;
    const missions = await prisma.mission.findMany({ where, orderBy: { date: 'asc' } });
    res.json(missions);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = {
   archiveMission, searchMissions
};
