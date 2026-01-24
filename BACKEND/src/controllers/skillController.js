const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all skills in catalog
exports.getAllSkills = async (req, res) => {
    try {
        console.log("SkillController: Fetching all skills...");
        const skills = await prisma.skill.findMany({
            orderBy: { name: 'asc' }
        });
        console.log(`SkillController: Found ${skills.length} skills`);
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin: Create new skill
exports.createSkill = async (req, res) => {
    try {
        const { name, description, requiresVerification } = req.body;
        const skill = await prisma.skill.create({
            data: { name, description, requiresVerification: requiresVerification || false }
        });
        res.json(skill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
