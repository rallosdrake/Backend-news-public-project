const express = require("express");
const app = express();
app.use(express.json());

app.get(`/api/topics`, getAllTopics);

app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

module.exports = app;
