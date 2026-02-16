import {
  addProductRepo,
  deleteProductByIdRepo,
  getProductByIdRepo,
  listProductsRepo,
} from "../stores/products.js";

export const listProducts = async () => {
  const products = await listProductsRepo();
  return products;
};

export const getProductById = async (id) => {
  const normalizedId = Number(id);
  if (isNaN(normalizedId)) return null;
  return await getProductByIdRepo(normalizedId);
};

export const deleteProductById = async (id) => {
  const normalizedId = Number(id);
  if (isNaN(normalizedId)) return null;
  const productToDelete = await getProductById(normalizedId);
  if (productToDelete == null) {
    return null;
  } else {
    await deleteProductByIdRepo(normalizedId);
    return productToDelete;
  }
};

export const addProduct = async (name, price) => {
  const normalizedPrice = Number(price);
  if (name.trim() === "" || isNaN(normalizedPrice) || normalizedPrice < 0)
    return null;
  const result = await addProductRepo(name, normalizedPrice);
  const lastId = result.lastID;
  if (typeof lastId !== "number" || lastId < 0)
    throw new Error("creation failed");
  const productAdded = await getProductById(lastId);
  if (productAdded == null) {
    return null;
  } else {
    return productAdded;
  }
};
