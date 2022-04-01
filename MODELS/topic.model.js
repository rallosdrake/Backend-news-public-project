const db = require("../db/connection");

exports.getTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => {
    return result.rows;
  });
};
exports.topicPost = (input) => {
  return db
    .query(
      `INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *;`,
      [input.slug, input.description]
    )
    .then((result) => {
      return result.rows[0];
    });
};
