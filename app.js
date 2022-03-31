const express = require("express");
const app = express();
app.use(express.json());

const apiRouter = require(`./Routes/api-routes`);

app.use(`/api`, apiRouter);

//handle route errors
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});
//handle PSQL errors
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
