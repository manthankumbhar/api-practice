const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const pool = require("./database");
require("dotenv").config();

app.use(express.json());
app.use(cors());

let port = process.env.PORT || 3000;

async function get_github_discord_url_by_id() {
  const data_1 = await pool.query(
    `select discord_url from github_discord_url where id = $1`,
    [`${db_id}`]
  );

  if (data_1.rows === null || data_1.rows >= 2 || data_1.rows.length == 0) {
    throw new Error("row doesn't exist");
  }

  const github_discord_url = await data_1.rows[0];

  return github_discord_url["discord_url"];
}
app.listen(port, () => {
  console.log(`running on ${port}`);
});

app.post("/github_push_webhook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    var reqData = req.body;

    if (reqData.head_commit === undefined) {
      return res.status(200).json({ message: "Github is testing" });
    }

    if (
      reqData.repository.owner.login === null ||
      reqData.repository.name === null
    ) {
      return res.status(400).json({ error: "bad format" });
    }

    get_github_discord_url_by_id((db_id = id));

    const github_discord_url = await get_github_discord_url_by_id();

    var message = `${reqData.repository.owner.login} just pushed a commit with message - '${reqData.head_commit.message}' to <${reqData.repository.name}>`;

    await axios({
      method: "POST",
      url: github_discord_url,
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

app.get("/github_discord_urls", async (req, res) => {
  res.json({ message: "Drop your discord urls in this api" });
});

app.post("/github_discord_urls", async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await pool.query(
      `insert into github_discord_url (discord_url) values ($1)`,
      [reqBody.url]
    );
    // console.log(reqBody.url);
    const id = await pool.query(
      `select id from github_discord_url where discord_url = $1`,
      [reqBody.url]
    );
    const id_matching_github_and_discord = id.rows[0];
    res
      .status(200)
      .json(
        `http://localhost:3000/github_discord_url/${id_matching_github_and_discord["id"]}`
      );
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// const discord_url = await pool.query(
//     `select id from github_discord_url`
// )
