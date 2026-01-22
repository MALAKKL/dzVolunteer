const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Create mission with skills & SDG
exports.createMission = async (req, res) => {
  try {
    const organizationId = req.user.organization.id; // from auth middleware
    const { title, description, location, startDate, endDate, volunteersNeeded, skills, sdgId } = req.body;

    // Validate SDG if provided
    let sdg = null;
    if (sdgId) {
      sdg = await prisma.sDG.findUnique({ where: { id: Number(sdgId) } });
      if (!sdg) return res.status(400).json({ message: "Invalid SDG selected" });
    }

    const mission = await prisma.mission.create({
      data: {
        organizationId,
        title,
        description,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        volunteersNeeded,
        sdgId: sdg ? sdg.id : null,
        skills: {
          create: skills.map(s => ({
            skillId: s.skillId,
            mustBeVerified: s.mustBeVerified || false,
            levelRequired: s.levelRequired || null
          }))
        }
      },
      include: {
        skills: { include: { skill: true } },
        sdg: true
      }
    });

    res.status(201).json({ message: "Mission created", mission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all missions (public)
exports.getAllMissions = async (req, res) => {
  try {
    const missions = await prisma.mission.findMany({
      include: {
        skills: { include: { skill: true } },
        sdg: true,
        organization: { select: { name: true, email: true } }
      }
    });

    res.json(missions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error loading missions" });
  }
};

// Get a mission by ID
exports.getMission = async (req, res) => {
  try {
    const missionId = req.params.id; // use string ID
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
      include: {
        skills: { include: { skill: true } },
        sdg: true,
        organization: true,
        applications: true
      }
    });

    if (!mission) return res.status(404).json({ message: "Mission not found" });

    res.json(mission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching mission" });
  }
};

// Update mission (organization only)
exports.updateMission = async (req, res) => {
  try {
    const missionId = req.params.id; // string ID
    const orgId = req.user.organization.id;

    const mission = await prisma.mission.findUnique({ where: { id: missionId } });

    if (!mission || mission.organizationId !== orgId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Validate SDG if trying to update
    if (req.body.sdgId) {
      const sdg = await prisma.sDG.findUnique({ where: { id: Number(req.body.sdgId) } });
      if (!sdg) return res.status(400).json({ message: "Invalid SDG" });

      req.body.sdgId = sdg.id;
    }

    const updated = await prisma.mission.update({
      where: { id: missionId },
      data: req.body,
      include: { skills: { include: { skill: true } }, sdg: true }
    });

    res.json({ message: "Mission updated", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating mission" });
  }
};

// Delete mission
exports.deleteMission = async (req, res) => {
  try {
    const missionId = req.params.id;
    const orgId = req.user.organization.id;

    const mission = await prisma.mission.findUnique({ where: { id: missionId } });

    if (!mission || mission.organizationId !== orgId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.mission.delete({ where: { id: missionId } });

    res.json({ message: "Mission deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting mission" });
  }
};

// Get all applicants for a mission (organization only)
exports.getMissionApplicants = async (req, res) => {
  try {
    const missionId = req.params.id;
    const orgId = req.user.organization.id;

    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
      include: {
        applications: { include: { volunteer: true } }
      }
    });

    if (!mission) return res.status(404).json({ message: "Mission not found" });
    if (mission.organizationId !== orgId) return res.status(403).json({ message: "Unauthorized" });

    res.json(mission.applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applicants" });
  }
};

// Approve or reject an applicant
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body; // "APPROVED" or "REJECTED"
    const applicationId = req.params.applicationId;
    const orgId = req.user.organization.id;

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { mission: true }
    });

    if (!application || application.mission.organizationId !== orgId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { status }
    });

    res.json({ message: `Application ${status}`, updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating application status" });
  }
};



//volunteer side 

exports.archiveMission =async (req, res) => {
  try {
    const id = Number(req.params.id);
    const mission = await prisma.mission.update({ where: { id }, data: { status: 'archived' } });
    res.json(mission);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Erreur serveur' });
  }
}

// search: q (keyword), city
exports.searchMissions =async (req, res) => {
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


