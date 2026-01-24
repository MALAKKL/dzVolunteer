const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const skills = [
        { name: 'First Aid', description: 'Emergency medical assistance' },
        { name: 'Teaching', description: 'Educational instruction and tutoring' },
        { name: 'Event Planning', description: 'Organizing and managing community events' },
        { name: 'Social Media Management', description: 'Managing online community presence' },
        { name: 'Photography', description: 'Visual documentation of events' },
        { name: 'Translation', description: 'Translating documents or providing live interpretation' },
        { name: 'Web Development', description: 'Building and maintaining websites' },
        { name: 'Graphic Design', description: 'Creating visual content for campaigns' },
    ];

    for (const skill of skills) {
        await prisma.skill.upsert({
            where: { name: skill.name },
            update: {},
            create: skill,
        });
    }

    console.log('✅ Skills catalog seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
