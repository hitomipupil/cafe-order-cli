const listProductsHandler = async () => {
  return await listProducts();
};

const getProductByIdHandler = async () => {
  return await getProductById();
};

const deleteProductByIdHandler = async () => {};

const addProductHandler = async () => {
  try {
    const result = await addProduct("foo", 300);
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
