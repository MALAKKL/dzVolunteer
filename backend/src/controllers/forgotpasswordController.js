const crypto = require("crypto");

exports.forgotPassword = async (req, res) => {
  const { email, role } = req.body;

  if (!["volunteer", "organization"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user =
    role === "volunteer"
      ? await prisma.volunteer.findUnique({ where: { email } })
      : await prisma.organization.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token before saving
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  if (role === "volunteer") {
    await prisma.volunteer.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: expiry,
      },
    });
  } else {
    await prisma.organization.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: expiry,
      },
    });
  }

  // TEMP: return token (later you send email)
  res.json({
    message: "Password reset token generated",
    resetToken,
  });
};
