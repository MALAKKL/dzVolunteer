const { parseStringPromise } = require("xml2js");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function importSDGs() {
  try {
    console.log("[SDG] Reading UN SDGs XML file...");

    const xmlPath = path.join(__dirname, "../data/un-sdgs.xml");
    const xmlContent = fs.readFileSync(xmlPath, "utf-8");

    console.log("[SDG] Parsing XML...");
    const result = await parseStringPromise(xmlContent);

    console.log("[SDG] Importing SDGs into database...");

    for (const sdgData of result.sdgs.sdg) {
      const id = parseInt(sdgData.$.id);
      const title = sdgData.title[0];
      const description = sdgData.description[0];

      await prisma.sDG.upsert({
        where: { id },
        update: {
          title,
          description,
        },
        create: {
          id,
          title,
          description,
        },
      });

      console.log(`[SDG] Imported SDG ${id}: ${title}`);
    }

    console.log("[SDG] All SDGs imported successfully ✅");
  } catch (error) {
    console.error("[SDG] Import failed ❌", error);
  } finally {
    await prisma.$disconnect();
  }
}

importSDGs();
