const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Verify JWT token and attach user to request
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database
    console.log("Authenticating user with ID:", decoded.id);

    let user;
    if (decoded.id === "admin") {
      // Return a virtual admin user
      user = { id: "admin", role: "ADMIN", email: process.env.ADMIN_EMAIL };
    } else {
      user = await prisma.user.findUnique({
        where: { id: decoded.id },
        include: {
          organization: {
            include: {
              missions: {
                orderBy: { startDate: "asc" }
              }
            }
          },
          volunteer: {
            include: {
              skills: { include: { skill: true } }
            }
          },
        },
      });

      // --- MIDDLEWARE REPAIR ---
      if (user) {
        if (user.role === "VOLUNTEER" && !user.volunteer) {
          console.log(`Middleware Repair: Creating volunteer for ${user.id}`);
          await prisma.volunteer.create({
            data: { userId: user.id, firstName: user.firstName || "User", lastName: user.lastName || "Volunteer" }
          });
          // Re-fetch with relations
          user = await prisma.user.findUnique({
            where: { id: user.id },
            include: { volunteer: { include: { skills: { include: { skill: true } } } }, organization: true }
          });
        }
      }
    }

    if (!user) {
      console.error("User not found for token ID:", decoded.id);
      return res.status(401).json({ error: "Invalid token" });
    }

    console.log("Authenticated user role:", user.role, "Has Org:", !!user.organization);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    next(error);
  }
};

// Verify user has specific role(s)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Insufficient permissions",
        requiredRole: roles,
        userRole: req.user.role,
      });
    }

    next();
  };
};

// Check if user owns the resource
const checkOwnership = (resourceType) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;

      switch (resourceType) {
        case "organization":
          if (req.user.role !== "ORGANIZATION" || req.user.organization.id !== resourceId) {
            return res.status(403).json({ error: "You can only modify your own organization" });
          }
          break;

        case "volunteer":
          if (req.user.role !== "VOLUNTEER" || req.user.volunteer.id !== resourceId) {
            return res.status(403).json({ error: "You can only modify your own profile" });
          }
          break;

        case "mission":
          const mission = await prisma.mission.findUnique({
            where: { id: resourceId },
            select: { organizationId: true },
          });

          if (!mission || mission.organizationId !== req.user.organization?.id) {
            return res.status(403).json({ error: "You can only modify your own missions" });
          }
          break;

        default:
          return res.status(400).json({ error: "Invalid resource type" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  authenticate,
  authorize,
  checkOwnership,
};
