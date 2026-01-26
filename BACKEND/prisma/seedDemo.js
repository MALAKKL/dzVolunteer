const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
    console.log('🏗️ Seeding Demo Data (20 Users, Many Missions)...');

    const password = await bcrypt.hash('malak123', 10);

    // 1. Create 5 Organizations
    const orgNames = ['Red Crescent Algeria', 'Ness El Khir', 'Touiza', 'Green Peace DZ', 'Tech For Good'];
    const orgs = [];
    for (let i = 0; i < orgNames.length; i++) {
        const user = await prisma.user.upsert({
            where: { email: `org${i}@test.com` },
            update: {},
            create: {
                email: `org${i}@test.com`,
                password,
                role: 'ORGANIZATION',
                firstName: 'Manager',
                lastName: `Org${i}`,
                organization: {
                    create: {
                        name: orgNames[i],
                        description: `Official account for ${orgNames[i]}.`,
                        fieldOfActivity: 'Humanitarian',
                        location: 'Algiers, Algeria'
                    }
                }
            },
            include: { organization: true }
        });
        orgs.push(user.organization);
    }

    // 2. Create 15 Volunteers
    const vols = [];
    for (let i = 0; i < 15; i++) {
        const user = await prisma.user.upsert({
            where: { email: `vol${i}@test.com` },
            update: {},
            create: {
                email: `vol${i}@test.com`,
                password,
                role: 'VOLUNTEER',
                firstName: `Volunteer`,
                lastName: `${i}`,
                volunteer: {
                    create: {
                        firstName: 'Volunteer',
                        lastName: `${i}`,
                        bio: 'Passionate about helping others.',
                        location: 'Oran, Algeria'
                    }
                }
            },
            include: { volunteer: true }
        });
        vols.push(user.volunteer);
    }

    // 3. Create 50 Missions (distributed across orgs)
    console.log('📅 Generating 50 missions...');
    for (let i = 0; i < 50; i++) {
        const org = orgs[i % orgs.length];
        await prisma.mission.create({
            data: {
                title: `Volunteering Mission #${i + 1}`,
                description: `This is a sample description for mission ${i + 1}. We need help with community support.`,
                location: 'Main Center, Algiers',
                organizationId: org.id,
                startDate: new Date(),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
                volunteersNeeded: 5 + (i % 10),
                isPublished: true,
                isArchived: false,
                image: '/mp2.png'
            }
        });
    }

    console.log('✅ Demo seeding complete!');
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
