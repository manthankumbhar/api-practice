const express = require("express");
const app = express();

app.use(express.json());

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`running on ${port}`);
});

app.get("/", (req, res) => {
  res.json("Hello World!");
});
