const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/", async (req, res) => {
  let reqData = JSON.parse(req.body);
  await axios({
    method: "post",
    url:
      "https://discord.com/api/webhooks/807324150296870932/LzRLbGFnC5EqIt6wLLTbnzhQXEo55CT9kv6u9m7jSreEdI9q_iBVVEsGbo7OwrJfAodn",
    data: {
      content: JSON.stringify(
        `${reqData.repository.owner.login} just pushed a commit with message - '${reqData.head_commit.message}' to <${reqData.repository.name}>`
      ),
      ContentType: "application/json",
    },
  });
  res.json({ message: "done" });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
