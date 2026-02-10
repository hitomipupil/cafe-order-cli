import { addProduct, deleteProductById } from "../services/products.js";

const getResult = async () => {
  try {
    const result = await addProduct("foo", 300);
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

getResult();
