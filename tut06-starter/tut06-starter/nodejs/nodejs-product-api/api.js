const http = require("http");

// Import the getProducts function
const { getProducts, addProduct, deleteProduct, updateProduct } = require("./dataProvider");

const products = getProducts();
function findProductById(id){
  return products.find(id);
}

// In-memory array to hold products (initially populated from the JSON file)
const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/products") {
    //  Retrieve a list of all products
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  }
  else if (req.method === "GET" && req.url.startsWith("/products/")) {
    //   Retrieve information about a specific product  by id
    const id = Number(req.url.split("/")[2]);
    console.log(`Looking for product with ID: ${id}`);
    const productFind = findProductById(id);
    if (productFind) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(productFind));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    }

  }
  else if (req.method === "POST" && req.url === "/products") {
    //   Add a new product to the list
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { name, price } = JSON.parse(body);
      const newProduct = addProduct({ name, price });

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newProduct));
    });
  }
  else if (req.method === "PUT" && req.url.startsWith("/products/")) {
    //   Update information about a product by id
    const id = req.url.split("/")[2];
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    })

    req.on('end', () => {
      try {
        const {name, price} = JSON.parse(body);
        const productUpdate = updateProduct(id, {name, price});
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: `Product have been updated successfully`, productUpdate: productUpdate}))
      } catch (error) {
        if (error.message === 'Product not found') {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Product not found' }));
      } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid data' }));
      }
      }
    })
  }
  else if (req.method === 'DELETE' && req.url.startsWith('/products/')) {
    const id = Number(req.url.split('/')[2]);
    const productDelete = deleteProduct(id);
    if (deleteProduct) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(productDelete));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "Product not found" }));
    }
  }
});

// Create the server

// Start the server on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
