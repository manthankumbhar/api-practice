const { Router, json } = require("express");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.json(req.body);
});

router.post("/", (req, res) => {
  let data = JSON.parse(req.body);
  res.json(
    `${data.repository.owner.name} just pushed a commit with message - '${data.head_commit.message}' to <${data.repository.name}>`
  );
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
