import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "leads.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;

  const fs = require("fs") as typeof import("fs");
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      anrede TEXT NOT NULL,
      vorname TEXT NOT NULL,
      familienname TEXT NOT NULL,
      email TEXT NOT NULL,
      strasse TEXT NOT NULL,
      hausnummer TEXT NOT NULL,
      plz TEXT NOT NULL,
      ort TEXT NOT NULL,
      country TEXT NOT NULL,
      selected_service TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  return db;
}

interface LeadData {
  anrede: string;
  vorname: string;
  familienname: string;
  email: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  country: string;
  selectedService: string;
}

export function saveLead(data: LeadData): void {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO leads (anrede, vorname, familienname, email, strasse, hausnummer, plz, ort, country, selected_service)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    data.anrede,
    data.vorname,
    data.familienname,
    data.email,
    data.strasse,
    data.hausnummer,
    data.plz,
    data.ort,
    data.country,
    data.selectedService,
  );
}
