const express = require("express");
const app = express();
app.use(express.json());
const { getAllTopics } = require(`./controllers`);
app.get(`/api/topics`, getAllTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
