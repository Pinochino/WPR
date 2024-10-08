const express = require("express");
const app = express();
const port = 3000;

app.get("/math/power/:base/:exponent", (req, res) => {
  const base = Number(req.params.base);
  const exponent = Number(req.params.exponent);
  let root = req.query.root = 'true';

  const result = Math.pow(base, exponent);
  const object = root ? { result: result, root: Math.sqrt(base) } : { result: result };


  res.end(JSON.stringify(object));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
