import sqlite3 from "sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// making path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.join(__dirname, "schema.sql");
const dbPath = path.join(__dirname, "..", "cafe.db");

const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) return console.error(err);
    db.run("PRAGMA foreign_keys = ON", (err) => {
      if (err) {
        db.close();
        return console.error(err);
      }
      fs.readFile(schemaPath, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          db.close();
          return;
        }
        db.exec(data, (err) => {
          if (err) {
            db.close();
            return console.error(err);
          }
          console.log("db initialized!");
          db.close();
        });
      });
    });
  }
);
