const express = require("express");
const app = express();
app.use(express.json());
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handleRouteErrors,
} = require(`./errors/index`);
const cors = require(`cors`);

const apiRouter = require(`./Routes/api-routes`);

app.use(cors(`/api`, apiRouter));

app.use(cors(handleRouteErrors));
app.use(cors(handleCustomErrors));
app.use(cors(handlePsqlErrors));
app.use(cors(handleServerErrors));

app.use(cors(`/api`, apiRouter));
module.exports = app;
