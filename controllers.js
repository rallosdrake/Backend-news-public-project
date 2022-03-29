const db = require("./db/connection");
const { getTopics } = require(`./MODELS/topic.model`);

exports.getAllTopics = (req, res, next) => {
  getTopics()
    .then((result) => {
      res.send({ topics: result });
    })
    .catch((err) => {
      next(err);
    });
};
