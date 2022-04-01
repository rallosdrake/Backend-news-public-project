//handle route errors
exports.handleRouteErrors = (req, res) => {
  res.status(404).send({ msg: "Route not found" });
};

//handle PSQL errors
exports.handlePsqlErrors = (err, req, res, next) => {
  const badReq = ["23502", "22P02"];
  if (badReq.includes(err.code)) {
    res.status(400).send({ msg: "Invalid data type for body or request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Username does not exist in database" });
  } else {
    next(err);
  }
};

//handle custom errors
exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send(err.msg);
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
};
