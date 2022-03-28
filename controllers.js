const db = require("./db/connection");
const { getTopics } = require(`./model`);

exports.getAllTopics = async (res, req, next) => {
  try {
    const topics = await getTopics();
    res.send({ topics });
  } catch (err) {
    next(err);
  }
};
