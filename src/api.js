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
      "https://discord.com/api/webhooks/807014769335992320/_wsZUCx1ck_APvuj1zBTzs4c4tlKF_JIbF5porzpWLE7hNvGpG1YwbFHgaDqEitU7LXm",
    data: {
      content: JSON.stringify(
        `${reqData.repository.owner.login} just pushed a commit with message - '${reqData.repository.id}' to <${reqData.repository.name}>`
      ),
      ContentType: "application/json",
    },
  });
  res.json({ message: "success" });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
