import { openDB } from "../configDB.ts";
import { type Bug } from "../types/bug.ts";

export function createBug(bug: Bug) {
  const db = openDB();

  const status = bug.status ?? "OPEN";
  const priority = bug.priority ?? "LOW";
  const sql = `INSERT INTO bugs (title, description, status, priority) VALUES (?, ?, ?, ?)`;
  db.prepare(sql).run(bug.title, bug.description, status, priority);
}

export function getAllBugs() {
  const db = openDB();
  const sql = `SELECT * FROM bugs`;
  return db.prepare(sql).all();
}

export function updateBugStatusAndPriority(id: number, bugData: Partial<Bug>) {
  const db = openDB();

  const getSql = `SELECT * FROM bugs WHERE id = ?`;
  const bug = db.prepare(getSql).get(id) as Bug | undefined;

  if (!bug) return null;

  const newStatus = bugData.status ?? bug.status;
  const newPriority = bugData.priority ?? bug.priority;

  const sqlUpdate = `UPDATE bugs SET status = ?, priority = ? WHERE id = ?`;
  db.prepare(sqlUpdate).run(newStatus, newPriority, id);
}

export function deleteBug(id: number) {
  const db = openDB();

  const sql = `DELETE FROM bugs WHERE id = ?`;
  db.prepare(sql).run(id);
}
