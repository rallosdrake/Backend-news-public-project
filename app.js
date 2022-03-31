const express = require("express");
const app = express();
app.use(express.json());

const {
  getArticleById,
  patchByArticleId,
  getAllArticles,
  getCommentsById,
  postCommentsById,
} = require(`./controllers/article.controller`);
const { getAllTopics } = require(`./controllers/topic.controller`);
const { getAllUsers } = require(`./controllers/users.controllers`);
const { deleteCommentById } = require(`./controllers/comments.controller`);
app.get(`/api/topics`, getAllTopics);
app.get(`/api/articles/:article_id`, getArticleById);
app.patch(`/api/articles/:article_id`, patchByArticleId);
app.get(`/api/users`, getAllUsers);
app.get(`/api/articles`, getAllArticles);
app.get(`/api/articles/:article_id/comments`, getCommentsById);
app.post(`/api/articles/:article_id/comments`, postCommentsById);
app.delete(`/api/comments/:comment_id`, deleteCommentById);
//app.get(`/api`, getApi);

//handle route errors
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});
//handle PSQL erros
app.use((err, req, res, next) => {
  const badReq = ["23502", "22P02"];
  if (badReq.includes(err.code)) {
    res.status(400).send({ msg: "Invalid data type for body or request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Username does not exist in database" });
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
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
