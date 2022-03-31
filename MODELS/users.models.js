const db = require("../db/connection");

exports.getUsers = () => {
  return db.query(`SELECT * FROM users`).then((result) => {
    return result.rows;
  });
};

exports.getUsersByUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1;`, [username])
    .then((result) => {
      if (result.rows.length) {
        return result.rows[0];
      } else {
      }
      return Promise.reject({ status: 404, msg: "Invalid username" });
    });
};
