const express = require("express");
const app = express();
app.use(express.json());

const { getAllTopics } = require(`./controllers/topic.controller`);
const { getArticleById } = require(`./controllers/article.controller`);
const { patchByArticleId } = require(`./controllers/article.controller`);

app.get(`/api/topics`, getAllTopics);
app.get(`/api/articles/:article_id`, getArticleById);
app.patch(`/api/articles/:article_id`, patchByArticleId);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

//handl psql errors
app.use((err, req, res, next) => {
  const badReqCodes = [`42703`, `22P02`];
  if (badReqCodes.includes(err.code)) {
    res.status(400).send({ msg: `bad request` });
  } else {
    next(err);
  }
});

//handle custom errors
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send(err.msg);
  } else {
    next(err);
  }
});

//handle unexpected errors
app.use((err, req, res, next) => {
  res.sendStatus(500);
});

module.exports = app;
