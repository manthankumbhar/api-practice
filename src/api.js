const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

require("dotenv").config();

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/", async (req, res) => {
  let reqData = JSON.parse(req.body);
  await axios({
    method: "post",
    url: process.env.DISCORD_WEBHOOK_URL,
    data: {
      content: JSON.stringify(
        `${reqData.repository.owner.login} just pushed a commit with message - '${reqData.head_commit.message}' to <${reqData.repository.name}>`
      ),
      ContentType: "application/json",
    },
  });
  res.json({ message: "done" });
});

//netlify defaults
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
