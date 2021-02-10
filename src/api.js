const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

require("dotenv").config();

const app = express();

const router = express.Router();

router.get("/ready", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/ready", async (req, res) => {
  var reqData = JSON.parse(req.body);
  if (
    reqData.repository.owner.login === null ||
    reqData.head_commit.message === null ||
    reqData.repository.name === null
  ) {
    return res.status(400).json({ error: "bad format" });
  }
  var message = `${reqData.repository.owner.login} just pushed a commit with message - '${reqData.head_commit.message}' to <${reqData.repository.name}>`;
  await axios({
    method: "POST",
    url: process.env.DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL,
    data: {
      content: JSON.stringify(message),
      ContentType: "application/json",
    },
  });
  res.json({ message: "success" });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
