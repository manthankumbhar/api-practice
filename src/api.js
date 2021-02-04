const { Router, json } = require("express");
const express = require("express");
const serverless = require("serverless-http");
const request = require("request");

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/", (req, res) => {
  console.log("passed");
  let data = JSON.parse(req.body);
  console.log("passed");
  request.post({
    url:
      "https://discord.com/api/webhooks/804824333913423923/qlEpAryvDXGPrXkIHrBI5JDmOMbi6B8u8bg_pL8sMVMBhhrt5o8sk37JQYGSwOc3l01k",
    headers: {
      "Content-Type": "application/json",
    },
    json: {
      content: `${data.repository.owner.name} just pushed a commit with message - '${data.head_commit.message}' to <${data.repository.name}>`,
    },
  });
  console.log("passed");
  res.json(
    `${data.repository.owner.name} just pushed a commit with message - '${data.head_commit.message}' to <${data.repository.name}>`
  );
  console.log("passed");
});

router.get("/dummy_discord", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/dummy_discord", (req, res) => {
  request.post({
    url:
      "https://discord.com/api/webhooks/806955359792005170/63mDY-CM-veI25ZjmC7bpEBjDHNSAvSA4xjWMFgbcYTMZbbNpJDlYL6NnAsbr7aSq7uI",
    headers: {
      "Content-Type": "application/json",
    },
    json: { content: "hello" },
  });
  res.json({ content: "hola" });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
