const express = require("express");
const app = express();
app.use(express.json());
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handleRouteErrors,
} = require(`./errors/index`);

const apiRouter = require(`./Routes/api-routes`);

app.use(`/api`, apiRouter);

app.use(handleRouteErrors);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

app.use(`/api`, apiRouter);
module.exports = app;
