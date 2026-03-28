const Database = require('better-sqlite3');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || __dirname;
const dbPath = path.join(DATA_DIR, 'usage.db');
const db = new Database(dbPath);

// WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS usage_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pm_id TEXT NOT NULL,
    skill TEXT NOT NULL,
    ts TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_usage_pm ON usage_events(pm_id);
  CREATE INDEX IF NOT EXISTS idx_usage_skill ON usage_events(skill);
  CREATE INDEX IF NOT EXISTS idx_usage_ts ON usage_events(ts);

  CREATE TABLE IF NOT EXISTS opt_outs (
    pm_id TEXT PRIMARY KEY,
    opted_out_at TEXT DEFAULT (datetime('now'))
  );
`);

// Prepared statements
const insertEvent = db.prepare(
  'INSERT INTO usage_events (pm_id, skill, ts) VALUES (?, ?, ?)'
);

const isOptedOut = db.prepare(
  'SELECT 1 FROM opt_outs WHERE pm_id = ?'
);

function recordEvent(pm_id, skill, ts) {
  if (isOptedOut.get(pm_id)) return false;
  insertEvent.run(pm_id, skill, ts);
  return true;
}

function getLeaderboard() {
  const byPm = db.prepare(`
    SELECT
      pm_id,
      COUNT(*) as count,
      MAX(DATE(ts)) as last_used
    FROM usage_events
    WHERE pm_id NOT IN (SELECT pm_id FROM opt_outs)
    GROUP BY pm_id
    ORDER BY count DESC
  `).all();

  // Calculate streaks
  const today = new Date().toISOString().slice(0, 10);
  for (const pm of byPm) {
    const days = db.prepare(`
      SELECT DISTINCT DATE(ts) as day
      FROM usage_events
      WHERE pm_id = ?
      ORDER BY day DESC
    `).all(pm.pm_id).map(r => r.day);

    let streak = 0;
    let expected = new Date(today);
    for (const day of days) {
      const d = new Date(day);
      const diff = Math.round((expected - d) / 86400000);
      if (diff <= 1) {
        streak++;
        expected = d;
      } else {
        break;
      }
    }
    pm.streak_days = streak;
  }

  const bySkill = db.prepare(`
    SELECT
      skill,
      COUNT(*) as count
    FROM usage_events
    WHERE pm_id NOT IN (SELECT pm_id FROM opt_outs)
    GROUP BY skill
    ORDER BY count DESC
    LIMIT 10
  `).all();

  const weeklyTrend = db.prepare(`
    SELECT
      strftime('%Y-W%W', ts) as week,
      COUNT(*) as count
    FROM usage_events
    WHERE pm_id NOT IN (SELECT pm_id FROM opt_outs)
    GROUP BY week
    ORDER BY week DESC
    LIMIT 8
  `).all();

  return { by_pm: byPm, by_skill: bySkill, weekly_trend: weeklyTrend };
}

function toggleOptOut(pm_id) {
  const existing = isOptedOut.get(pm_id);
  if (existing) {
    db.prepare('DELETE FROM opt_outs WHERE pm_id = ?').run(pm_id);
    return { opted_out: false };
  }
  db.prepare('INSERT INTO opt_outs (pm_id) VALUES (?)').run(pm_id);
  // Anonymize existing records
  db.prepare("UPDATE usage_events SET pm_id = 'anonymous' WHERE pm_id = ?").run(pm_id);
  return { opted_out: true };
}

module.exports = { recordEvent, getLeaderboard, toggleOptOut };
