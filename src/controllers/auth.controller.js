//log in for volunteer

const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signupSchema, loginSchema } = require('../utils/validators');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

async function volunteerRegister(req, res) {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { firstName, lastName, email, password, phone, bio, city, country } = req.body;
  try {
    const existing = await prisma.volunteer.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.volunteer.create({
      data: { firstName, lastName, email, password: hashed, phone, bio, city, country }
    });

    const token = jwt.sign({ id: user.id, role: 'volunteer', email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    const { password: p, ...safe } = user;
    res.status(201).json({ user: safe, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

async function volunteerLogin(req, res) {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { email, password } = req.body;
  try {
    const user = await prisma.volunteer.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Identifiants invalides' });

    const token = jwt.sign({ id: user.id, role: 'volunteer', email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    const { password: p, ...safe } = user;
    res.json({ user: safe, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = { volunteerRegister, volunteerLogin };
