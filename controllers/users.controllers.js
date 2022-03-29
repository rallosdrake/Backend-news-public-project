const { getUsers } = require(`../MODELS/users.models`);

exports.getAllUsers = (req, res, next) => {
  getUsers()
    .then((result) => {
      res.send({ users: result });
    })
    .catch((err) => {
      next(err);
    });
};
