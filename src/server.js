import http from "http";
import { getProductById, listProducts } from "./services/products.js";
import url from "url";

http
  .createServer(async (req, res) => {
    const method = req.method;
    const pathnameSegments = url
      .parse(req.url, true)
      .pathname.split("/")
      .filter(Boolean);
    if (method === "GET") {
      if (pathnameSegments.length === 1 && pathnameSegments[0] === "products") {
        try {
          const data = await listProducts();
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(data));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Server Error" }));
          console.error(err);
        }
      } else if (
        pathnameSegments.length === 2 &&
        pathnameSegments[0] === "products"
      ) {
        const id = pathnameSegments[1];
        try {
          if (isNaN(parseInt(id))) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Bad Request" }));
            res.end();
            return;
          }
          const data = await getProductById(id);
          if (data == null) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Product not found" }));
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(data));
          }
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Server Error" }));
          console.error(err);
        }
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Not Found" }));
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Not Found" }));
    }
    res.end();
  })
  .listen(3000);

console.log("Server started on port 3000");
