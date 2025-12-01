const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a mission (organization only)
exports.createMission = async (req, res) => {
  try {
    const { title, description, location, date, slots, skillsRequired } = req.body;

    const orgId = req.user.id; // from auth middleware

    const mission = await prisma.mission.create({
      data: {
        title,
        description,
        location,
        date: new Date(date),
        slots,
        organizationId: orgId,

        // skillsRequired = [1,2,3]
        skillsRequired: {
          connect: skillsRequired?.map((id) => ({ id })),
        },
      },
      include: {
        skillsRequired: true,
        organization: true,
      },
    });

    res.status(201).json(mission);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating mission" });
  }
};

// Get all missions (public)
exports.getAllMissions = async (req, res) => {
  try {
    const missions = await prisma.mission.findMany({
      include: {
        skillsRequired: true,
        organization: {
          select: { name: true, email: true },
        },
      },
    });

    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: "Error loading missions" });
  }
};

// Get a mission by ID
exports.getMission = async (req, res) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        skillsRequired: true,
        organization: true,
        applications: true,
      },
    });

    if (!mission) return res.status(404).json({ message: "Mission not found" });

    res.json(mission);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

// Update mission (organization only)
exports.updateMission = async (req, res) => {
  try {
    const missionId = Number(req.params.id);
    const orgId = req.user.id;

    // Ensure mission belongs to this org
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission || mission.organizationId !== orgId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await prisma.mission.update({
      where: { id: missionId },
      data: req.body,
    });

    res.json({ message: "Mission updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating mission" });
  }
};

// Delete mission
exports.deleteMission = async (req, res) => {
  try {
    const missionId = Number(req.params.id);
    const orgId = req.user.id;

    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission || mission.organizationId !== orgId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.mission.delete({
      where: { id: missionId },
    });

    res.json({ message: "Mission deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mission" });
  }
};
