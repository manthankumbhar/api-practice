const express = require("express");
const app = express();
const axios = require("axios");
const pool = require("./database");
require("dotenv").config();

app.use(express.json());

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`running on ${port}`);
});

app.post("/github_push_webhook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    var reqData = req.body;

    const commit_message = reqData.head_commit.message || reqData.repository.id;
    // using this because when github sends the first POST request, there is no commit message which leads to error 400

    if (
      reqData.repository.owner.login === null ||
      commit_message === null ||
      reqData.repository.name === null
    ) {
      return res.status(400).json({ error: "bad format" });
    }

    var message = `${reqData.repository.owner.login} just pushed a commit with message - '${commit_message}' to <${reqData.repository.name}>`;
    const data = await pool.query(
      "select discord_urls from github_discord_url where id = $1",
      [id]
    );
    const discord_url = data.rows[0];

    await axios({
      method: "POST",
      url: discord_url["discord_urls"],
      data: {
        content: JSON.stringify(message),
        ContentType: "application/json",
      },
    });
    res.status(200).json("Success");
  } catch (err) {
    res.status(400).json(err.message);
  }
});
