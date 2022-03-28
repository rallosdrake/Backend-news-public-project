const db = require("./db/connection");

exports.getTopics = () => {
  let queryStr = `
    SELECT
    *
    FROM
    topics;
    `;

  return db
    .query(queryStr)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      next(err);
    });
};
