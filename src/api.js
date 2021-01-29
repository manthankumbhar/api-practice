const express = require("express");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "hello world!!",
  });
});

//practice

// router.get("/github", (req, res) => {
//   res.json(req.body);
// });

router.get("/git", (req, res) => {
  res.json(req.body);
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
