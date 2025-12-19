exports.isOrganization = (req, res, next) => {
  if (req.user.role !== "organization") {
    return res
      .status(403)
      .json({ message: "Access denied — organization only." });
  }
  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

