import {
  addProduct,
  deleteProductById,
  getProductById,
  listProducts,
} from "../services/products.js";

export const listProductsHandler = async () => {
  try {
    const products = await listProducts();
    console.log(products);
  } catch (err) {
    console.error(err);
  }
};

export const getProductByIdHandler = async (id) => {
  try {
    const product = await getProductById(id);
    if (product == null) {
      console.log("Product is not found");
    } else {
      console.log(product);
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteProductByIdHandler = async (id) => {
  try {
    const result = await deleteProductById(id);
    if (result == null) {
      console.log("Product is not found");
    } else {
      console.log("Deleted:");
      console.log(result);
    }
  } catch (err) {
    console.error(err);
  }
};

export const addProductHandler = async (name, price) => {
  try {
    const result = await addProduct(name, price);
    if (result == null) {
      console.log("Failed adding product");
    } else {
      console.log(result);
    }
  } catch (err) {
    console.error(err);
  }
};
