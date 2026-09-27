import Database from "better-sqlite3";

export function openDB() {
  const db = new Database("./database.db");

  db.exec(`CREATE TABLE IF NOT EXISTS bugs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'OPEN',
            priority TEXT NOT NULL DEFAULT 'LOW',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

  return db;
}
