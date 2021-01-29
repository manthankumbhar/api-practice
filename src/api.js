const express = require("express");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "hello world!!",
  });
});

// router.post("/github", (req, res) => {
//   res.json({ hello: "hi" });
// });

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
