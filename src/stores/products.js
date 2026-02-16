import { db } from "../db.js";

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
