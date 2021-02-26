const express = require("express");
const app = express();
const axios = require("axios");
const pool = require("./database");
require("dotenv").config();

app.use(express.json());

let port = process.env.PORT || 3000;

async function universal_api_posts() {
  try {
    const data_1 = await pool.query(
      `select discord_url from github_discord_url where id = $1`,
      [`${db_id}`]
    );
    // console.log("ok");
    // console.log(data_1.rows[0]);

    const github_discord_url = data_1.rows[0];
    // console.log(github_discord_url);

    if (data_1.rows === null || data_1.rows >= 2) {
      throw new Error("row doesn't exist");
    }

    var message = `${param1} just pushed a commit with message - '${param2}' to <${param3}>`;

    await axios({
      method: "POST",
      url: github_discord_url[`${db_url}`],
      data: {
        content: JSON.stringify(message),
        ContentType: "application/json",
      },
    });
  } catch (err) {
    console.log(err.message);
  }
}
app.listen(port, () => {
  console.log(`running on ${port}`);
});

app.post("/github_push_webhook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    var reqData = req.body;
    // console.log(id);

    if (reqData.head_commit === undefined) {
      return res.status(200).json({ message: "Github is testing" });
    }

    if (
      reqData.repository.owner.login === null ||
      reqData.repository.name === null
    ) {
      return res.status(400).json({ error: "bad format" });
    }

    universal_api_posts(
      ((db_id = id),
      (param1 = reqData.repository.owner.login),
      (param2 = reqData.head_commit.message),
      (param3 = reqData.repository.name),
      (db_url = "discord_url"))
    );

    res.status(200).json("Success");
  } catch (err) {
    res.status(400).json(err.message);
  }
});
