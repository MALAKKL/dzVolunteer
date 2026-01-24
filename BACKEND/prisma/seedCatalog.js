const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Re-Seeding Integrated Skill Catalog...');

    // 1. Core Professional Skills
    const coreSkills = [
        { name: 'First Aid & CPR', description: 'Emergency medical response and life-saving techniques.' },
        { name: 'Language Translation', description: 'Translating documents or providing live interpretation.' },
        { name: 'Graphic Design', description: 'Creating visual content for marketing.' },
        { name: 'Web Development', description: 'Building and maintaining websites.' },
        { name: 'Event Management', description: 'Planning and coordinating community events.' },
        { name: 'Teaching & Tutoring', description: 'Educational support.' },
        { name: 'Social Media Strategy', description: 'Managing online communities.' },
        { name: 'Photography', description: 'Visual storytelling.' },
        { name: 'Counseling', description: 'Psychological support.' },
        { name: 'Logistics', description: 'Supply transport and distribution.' }
    ];

    for (const s of coreSkills) {
        await prisma.skill.upsert({
            where: { name: s.name },
            update: { description: s.description },
            create: s,
        });
    }

    // 2. Add SDGs ALSO into the Skill table so they can be selected
    // The user asked for "SDG or any other skills" in the catalog
    const sdgs = [
        { name: 'SDG 1: No Poverty', desc: 'End poverty in all its forms everywhere.' },
        { name: 'SDG 2: Zero Hunger', desc: 'End hunger and achieve food security.' },
        { name: 'SDG 3: Good Health', desc: 'Ensure healthy lives and promote well-being.' },
        { name: 'SDG 4: Quality Education', desc: 'Ensure inclusive and equitable quality education.' },
        { name: 'SDG 5: Gender Equality', desc: 'Achieve gender equality and empower women.' },
        { name: 'SDG 6: Clean Water', desc: 'Ensure availability of water and sanitation.' },
        { name: 'SDG 13: Climate Action', desc: 'Take urgent action to combat climate change.' }
    ];

    for (const s of sdgs) {
        await prisma.skill.upsert({
            where: { name: s.name },
            update: { description: s.desc },
            create: { name: s.name, description: s.desc },
        });
    }

    // 3. Keep the SDG model table separate too if needed for filtering
    const sdgData = [
        { id: 1, title: 'No Poverty', description: 'End poverty.' },
        { id: 2, title: 'Zero Hunger', description: 'End hunger.' },
        { id: 3, title: 'Good Health', description: 'Ensure healthy lives.' },
        { id: 4, title: 'Quality Education', description: 'Ensure education.' },
        { id: 5, title: 'Gender Equality', description: 'Empower women.' },
        { id: 6, title: 'Clean Water', description: 'Sanitation.' },
        { id: 13, title: 'Climate Action', description: 'Action on climate.' }
    ];

    for (const d of sdgData) {
        await prisma.sDG.upsert({
            where: { id: d.id },
            update: { title: d.title },
            create: d
        });
    }

    console.log('🚀 Catalog integrated and ready!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
