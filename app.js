const express = require("express");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handleRouteErrors,
} = require(`./errors/index`);
const cors = require(`cors`);

const apiRouter = require(`./Routes/api-routes`);
const app = express();
app.use(express.json());
app.use(cors());

app.use(`/api`, apiRouter);

app.use(handleRouteErrors);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

app.use(`/api`, apiRouter);
module.exports = app;
