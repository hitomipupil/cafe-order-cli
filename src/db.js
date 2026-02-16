import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { dbPath } from "./consts.js";

export const db = await open({
  filename: dbPath,
  driver: sqlite3.Database,
});
