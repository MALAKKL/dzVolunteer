const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const xml2js = require("xml2js");

// Import SDGs from XML
exports.importSDGs = async (req, res) => {
  try {
    const xml = fs.readFileSync("sdgs.xml", "utf-8");
    const result = await xml2js.parseStringPromise(xml);

    const sdgs = result.SDGs.SDG.map(s => ({
      id: parseInt(s.ID[0]),
      title: s.Title[0],
      description: s.Description[0]
    }));

    for (const sdg of sdgs) {
      await prisma.sDG.upsert({
        where: { id: sdg.id },
        update: { title: sdg.title, description: sdg.description },
        create: sdg
      });
    }

    res.json({ message: "SDGs imported", count: sdgs.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filter missions by SDG
exports.getMissionsBySDG = async (req, res) => {
  try {
    const sdgId = Number(req.query.sdgId);
    const missions = await prisma.mission.findMany({ where: { sdgId } });
    res.json(missions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
