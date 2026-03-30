const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || __dirname;
const dbPath = path.join(DATA_DIR, 'usage.db');

let db;

async function getDb() {
  if (db) return db;
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const buf = fs.readFileSync(dbPath);
    db = new SQL.Database(buf);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS usage_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pm_id TEXT NOT NULL,
      skill TEXT NOT NULL,
      ts TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
  db.run(`CREATE INDEX IF NOT EXISTS idx_usage_pm ON usage_events(pm_id);`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_usage_skill ON usage_events(skill);`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_usage_ts ON usage_events(ts);`);
  db.run(`
    CREATE TABLE IF NOT EXISTS opt_outs (
      pm_id TEXT PRIMARY KEY,
      opted_out_at TEXT DEFAULT (datetime('now'))
    );
  `);

  return db;
}

function persist() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

function recordEvent(pm_id, skill, ts) {
  const rows = db.exec('SELECT 1 FROM opt_outs WHERE pm_id = ?', [pm_id]);
  if (rows.length > 0 && rows[0].values.length > 0) return false;
  db.run('INSERT INTO usage_events (pm_id, skill, ts) VALUES (?, ?, ?)', [pm_id, skill, ts]);
  persist();
  return true;
}

function getLeaderboard() {
  const byPmRows = db.exec(`
    SELECT pm_id, COUNT(*) as count, MAX(DATE(ts)) as last_used
    FROM usage_events
    WHERE pm_id NOT IN (SELECT pm_id FROM opt_outs)
    GROUP BY pm_id
    ORDER BY count DESC
  `);

  const byPm = byPmRows.length > 0
    ? byPmRows[0].values.map(r => ({ pm_id: r[0], count: r[1], last_used: r[2] }))
    : [];

  const today = new Date().toISOString().slice(0, 10);
  for (const pm of byPm) {
    const daysRows = db.exec(
      'SELECT DISTINCT DATE(ts) as day FROM usage_events WHERE pm_id = ? ORDER BY day DESC',
      [pm.pm_id]
    );
    const days = daysRows.length > 0 ? daysRows[0].values.map(r => r[0]) : [];

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

  const bySkillRows = db.exec(`
    SELECT skill, COUNT(*) as count
    FROM usage_events
    WHERE pm_id NOT IN (SELECT pm_id FROM opt_outs)
    GROUP BY skill
    ORDER BY count DESC
    LIMIT 10
  `);
  const bySkill = bySkillRows.length > 0
    ? bySkillRows[0].values.map(r => ({ skill: r[0], count: r[1] }))
    : [];

  const weeklyRows = db.exec(`
    SELECT strftime('%Y-W%W', ts) as week, COUNT(*) as count
    FROM usage_events
    WHERE pm_id NOT IN (SELECT pm_id FROM opt_outs)
    GROUP BY week
    ORDER BY week DESC
    LIMIT 8
  `);
  const weeklyTrend = weeklyRows.length > 0
    ? weeklyRows[0].values.map(r => ({ week: r[0], count: r[1] }))
    : [];

  return { by_pm: byPm, by_skill: bySkill, weekly_trend: weeklyTrend };
}

function toggleOptOut(pm_id) {
  const rows = db.exec('SELECT 1 FROM opt_outs WHERE pm_id = ?', [pm_id]);
  if (rows.length > 0 && rows[0].values.length > 0) {
    db.run('DELETE FROM opt_outs WHERE pm_id = ?', [pm_id]);
    persist();
    return { opted_out: false };
  }
  db.run('INSERT INTO opt_outs (pm_id) VALUES (?)', [pm_id]);
  db.run("UPDATE usage_events SET pm_id = 'anonymous' WHERE pm_id = ?", [pm_id]);
  persist();
  return { opted_out: true };
}

module.exports = { getDb, recordEvent, getLeaderboard, toggleOptOut };
