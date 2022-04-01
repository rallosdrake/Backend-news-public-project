const db = require("../db/connection");
const { getTopics, topicPost } = require(`../MODELS/topic.model`);

exports.getAllTopics = (req, res, next) => {
  getTopics()
    .then((result) => {
      res.send({ topics: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postTopics = (req, res, next) => {
  const input = req.body;
  topicPost(input)
    .then((result) => {
      res.status(201).send({ topic: result });
    })
    .catch((err) => {
      next(err);
    });
};
