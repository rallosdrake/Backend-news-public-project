const db = require("./db/connection");
const { getTopics } = require(`./model`);

exports.getAllTopics = async (res, req, next) => {
  try {
    const topics = await getTopics();
    console.log();
    res.send({ topics });
  } catch (err) {
    next(err);
  }
};
