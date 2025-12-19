exports.resetPassword = async (req, res) => {
  const { token, newPassword, role } = req.body;

  if (newPassword.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
    });
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user =
    role === "volunteer"
      ? await prisma.volunteer.findFirst({
          where: {
            resetToken: hashedToken,
            resetTokenExpiry: { gt: new Date() },
          },
        })
      : await prisma.organization.findFirst({
          where: {
            resetToken: hashedToken,
            resetTokenExpiry: { gt: new Date() },
          },
        });

  if (!user) {
    return res.status(400).json({ message: "Token invalid or expired" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  if (role === "volunteer") {
    await prisma.volunteer.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
  } else {
    await prisma.organization.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
  }

  res.json({ message: "Password reset successful" });
};
