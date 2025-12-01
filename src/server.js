require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const volunteerRoutes = require('./routes/volunteer.routes');
const missionRoutes = require('./routes/mission.routes');
const applicationRoutes = require('./routes/application.routes');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/applications', applicationRoutes);

// health
app.get('/', (req, res) => res.send('API benevolat OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
