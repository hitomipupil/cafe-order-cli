import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "..", "cafe.db");

const db = await open({
  filename: dbPath,
  driver: sqlite3.Database,
});

export const listProductsRepo = async () => {
  return await db.all("SELECT * FROM Products");
};

export const getProductByIdRepo = async (id) => {
  const sql = "SELECT * FROM Products WHERE id = ?";
  const data = await db.get(sql, [id]);
  return data;
};

export const deleteProductByIdRepo = async (id) => {
  const sql = "DELETE FROM Products WHERE id = ?";
  await db.run(sql, [id]);
};

export const addProductRepo = async (name, price) => {
  const sql = "INSERT INTO Products (name, price) VALUES (?, ?)";
  const result = await db.run(sql, [name, price]);
  return result;
};
