const express = require('express');
const path = require('path');
const { getDb, recordEvent, getLeaderboard, toggleOptOut } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CORS for local curl requests
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Rate limiting: pm_id -> { count, resetAt }
const rateLimits = new Map();

function checkRateLimit(pm_id) {
  const now = Date.now();
  const entry = rateLimits.get(pm_id);
  if (!entry || now > entry.resetAt) {
    rateLimits.set(pm_id, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= 100) return false;
  entry.count++;
  return true;
}

// POST /api/usage - Record a usage event
app.post('/api/usage', (req, res) => {
  const { pm_id, skill, ts } = req.body;
  if (!pm_id || !skill) {
    return res.status(400).json({ error: 'pm_id and skill are required' });
  }
  if (!checkRateLimit(pm_id)) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  const recorded = recordEvent(pm_id, skill, ts || new Date().toISOString());
  if (!recorded) {
    return res.status(200).json({ status: 'opted_out' });
  }
  res.status(201).json({ status: 'recorded' });
});

// GET /api/leaderboard - Aggregated leaderboard data
app.get('/api/leaderboard', (req, res) => {
  const data = getLeaderboard();
  res.json(data);
});

// POST /api/opt-out - Toggle opt-out for a pm_id
app.post('/api/opt-out', (req, res) => {
  const { pm_id } = req.body;
  if (!pm_id) {
    return res.status(400).json({ error: 'pm_id is required' });
  }
  const result = toggleOptOut(pm_id);
  res.json(result);
});

// Static files
app.use(express.static(path.join(__dirname)));

// Initialize DB then start server
getDb().then(() => {
  app.listen(PORT, () => {
    console.log(`PM-OS Starter running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
