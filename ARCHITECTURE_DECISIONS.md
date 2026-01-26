# Architecture Decision Log (ADL) - DZ Volunteer

This document justifies the technical decisions made during the development of DZ Volunteer.

## 1. Data Modeling: Skills & Competencies
**Decision:** We chose to use **Enriched Join Tables** (Many-to-Many with attributes) for both Volunteers and Missions.

**Justification:**
- **VolunteerSkill:** Instead of a simple link, we track `status` (PENDING, VERIFIED, REJECTED) and a `certificate` URL. This is critical for the "Verification Required" constraint.
- **MissionSkill:** We include `levelRequired` and `mustBeVerified`. This allows the system to distinguish between a "nice-to-have" skill and a mandatory verified competency.

**ER Schema Reflection:**
- `Volunteer` (1) --- (*) `VolunteerSkill` (*) --- (1) `Skill`
- `Mission` (1) --- (*) `MissionSkill` (*) --- (1) `Skill`

## 2. Authentication & Security
**Decision:** **JWT (JSON Web Tokens)** with **Bcrypt** hashing.

**Justification:**
- **Statelessness:** JWT allows our backend to remain stateless, making it easier to scale and compatible with modern deployment platforms like Vercel/Render.
- **Security:** Passwords are never stored in plain text. We use `bcrypt` with a salt factor of 10.
- **Role-Based Access Control (RBAC):** We embed the user `role` (VOLUNTEER, ORGANIZATION, ADMIN) in the JWT payload, allowing the middleware to quickly verify permissions without constant database hits.

## 3. Architecture Logique: Validation of Hours
**Decision:** **Server-side guards and prisma transactions.**

**Justification:**
- **Authorization:** Only the Organization that *owns* the mission can access the validation endpoint for that specific mission. We use a middleware/controller check: `if (mission.organizationId !== req.user.organization.id) return Unauthorized`.
- **Integrity:** We use Prisma Transactions when validating hours. If an organization validates 10 hours for a volunteer, the `Participation` record is updated **and** the Volunteer's `totalHoursVolunteered` is incremented in a single atomic operation.
- **Constraint:** The UI and Backend restrict validation until the mission's `endDate` has passed.

## 4. Performance & Availability
**Decision:** **Cloudinary CDN & Prisma Indexing.**

**Justification:**
- **Images:** By using Cloudinary, we offload image processing and bandwidth. We use `f_auto` and `q_auto` to ensure fast loading on mobile (WebP).
- **Database Indexing:** We added indexes on `email` (for login speed) and `organizationId`/`volunteerId` in join tables to prevent "N+1" query performance degradation.

## 5. Changement de Cap (Pivot Action)
**Initially planned:** A simple "Direct Join" system where volunteers click a button and are immediately added to a mission.
**Problem:** Organizations expressed the need to filter participants based on specific competencies and motivation.
**Pivot:** We implemented a **Candidature (Application) System**. 
- Statuses: PENDING, APPROVED, REJECTED.
- Benefit: Organizations can now review the volunteer's profile and certificate-status before accepting them. This added complexity to the Prisma schema but significantly improved the real-world utility of the platform.
