const { createClient } = require("@libsql/client");
const fs = require("fs");

const env = {};
try {
  const text = fs.readFileSync(".env.local", "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
} catch {}

const url = env.DATABASE_URL;
const authToken = env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

console.log("Connecting to Turso:", url.slice(0, 40) + "...");

const db = createClient({ url, authToken });

async function main() {
  await db.execute("DROP TABLE IF EXISTS automations");
  await db.execute("DROP TABLE IF EXISTS sessions");
  await db.execute("DROP TABLE IF EXISTS users");

  const sql = fs.readFileSync("drizzle/0000_bright_apocalypse.sql", "utf8");
  const stmts = sql
    .split("--> statement-breakpoint")
    .map((s) => s.trim())
    .filter(Boolean);

  for (const stmt of stmts) {
    console.log("Running:", stmt.slice(0, 80).replace(/\n/g, " ") + "...");
    await db.execute(stmt);
  }

  console.log("All 3 tables created successfully.");
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
