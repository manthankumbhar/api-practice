const { Router, json } = require("express");
const express = require("express");
const serverless = require("serverless-http");
const request = require("request");
const axios = require("axios");

const app = express();

const router = express.Router();

//<------------------------------------------------------------------------------------------------------------------------------------------------>

router.get("/", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/", (req, res) => {
  let data = JSON.parse(req.body);
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
  res.json(
    `${data.repository.owner.name} just pushed a commit with message - '${data.head_commit.message}' to <${data.repository.name}>`
  );
});

//<------------------------------------------------------------------------------------------------------------------------------------------------>

router.get("/dummy_discord", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/dummy_discord", (req, res) => {
  // let data = JSON.parse(req.body);
  request({
    url:
      "https://discord.com/api/webhooks/806955359792005170/63mDY-CM-veI25ZjmC7bpEBjDHNSAvSA4xjWMFgbcYTMZbbNpJDlYL6NnAsbr7aSq7uI",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    json: { content: "hello" },
  });
  res.json({ message: "Done" });
});

//<------------------------------------------------------------------------------------------------------------------------------------------------>

router.get("/test", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/test", (req, res) => {
  let data = JSON.parse(req.body);
  axios({
    method: "post",
    url:
      "https://discord.com/api/webhooks/807014769335992320/_wsZUCx1ck_APvuj1zBTzs4c4tlKF_JIbF5porzpWLE7hNvGpG1YwbFHgaDqEitU7LXm",
    data: {
      content: JSON.stringify(
        `${data.repository.owner.name} just pushed a commit with message - '${data.head_commit.message}' to <${data.repository.name}>`
      ),
      ContentType: "application/json",
    },
  });
  res.json({ message: "success" });
});

//<------------------------------------------------------------------------------------------------------------------------------------------------>

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
