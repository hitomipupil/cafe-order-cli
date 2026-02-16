import {
  addProductHandler,
  deleteProductByIdHandler,
  getProductByIdHandler,
  listProductsHandler,
} from "./controllers/products.controller.js";

const command = process.argv[2];

switch (command) {
  case "list":
    await listProductsHandler();
    break;
  case "get":
    const idToGet = process.argv[3];
    await getProductByIdHandler(idToGet);
    break;
  case "delete":
    const idToDelete = process.argv[3];
    await deleteProductByIdHandler(idToDelete);
    break;
  case "add":
    const name = process.argv[3];
    const price = process.argv[4];
    await addProductHandler(name, price);
    break;
}
