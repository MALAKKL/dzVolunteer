const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ========================
// GET ALL ORGANIZATIONS
// ========================
exports.getAllOrganizations = async (req, res, next) => {
  try {
    const { search, limit = 20, offset = 0 } = req.query;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const organizations = await prisma.organization.findMany({
      where,
      take: Number.parseInt(limit),
      skip: Number.parseInt(offset),
      include: {
        _count: { select: { missions: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.organization.count({ where });

    res.json({
      data: organizations,
      pagination: {
        total,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ========================
// GET ORGANIZATION BY ID
// ========================
exports.getOrganizationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        missions: {
          where: { isPublished: true, isArchived: false },
          orderBy: { startDate: "asc" },
        },
      },
    });

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.json(organization);
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE ORGANIZATION
// ========================
exports.updateOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, mission, history, contact, website, logoUrl } = req.body;

    const updatedOrganization = await prisma.organization.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(mission !== undefined && { mission }),
        ...(history !== undefined && { history }),
        ...(contact !== undefined && { contact }),
        ...(website !== undefined && { website }),
        ...(logoUrl !== undefined && { logoUrl }),
      },
    });

    res.json(updatedOrganization);
  } catch (error) {
    next(error);
  }
};
//upload ppf
exports.uploadOrgProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const photoPath = `/uploads/organizations/${req.file.filename}`;

    await prisma.organization.update({
      where: { userId: req.user.id },
      data: { logo: photoPath },
    });

    res.json({
      message: "Profile photo uploaded successfully",
      photo: photoPath,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Validate hours for volunteers
exports.validateParticipation = async (req, res) => {
  try {
    const organizationId = req.user.organization.id;
    const { missionId, volunteerId, hoursCompleted, notes } = req.body;

    const mission = await prisma.mission.findUnique({ where: { id: missionId } });
    if (!mission || mission.organizationId !== organizationId)
      return res.status(403).json({ message: "Not allowed" });

    // Create or update participation
    const participation = await prisma.participation.upsert({
      where: { missionId_volunteerId: { missionId, volunteerId } },
      update: { hoursCompleted, validatedAt: new Date(), validatedBy: organizationId, notes },
      create: { missionId, volunteerId, hoursCompleted, validatedBy: organizationId, notes }
    });

    // Update volunteer total hours
    const volunteer = await prisma.volunteer.findUnique({ where: { id: volunteerId } });
    await prisma.volunteer.update({
      where: { id: volunteerId },
      data: { totalHoursVolunteered: volunteer.totalHoursVolunteered + hoursCompleted }
    });

    res.json({ message: "Participation validated", participation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
