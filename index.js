const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const pool = require("./database");
require("dotenv").config();

app.use(express.json());
app.use(cors());

let port = process.env.PORT || 3000;

app.post("/github_discord_urls", async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await pool.query(
      `insert into github_discord_url (discord_url) values ($1)`,
      [reqBody.url]
    );
    const id = await pool.query(
      `select id from github_discord_url where discord_url = $1`,
      [reqBody.url]
    );
    const id_matching_github_and_discord = id.rows[0];
    res
      .status(200)
      .json(
        `https://v2-github-discord-api-and-me.herokuapp.com/github_push_webhook/${id_matching_github_and_discord["id"]}`
      );
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
