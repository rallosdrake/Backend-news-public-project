const { getUsers, getUsersByUsername } = require(`../MODELS/users.models`);

exports.getAllUsers = (req, res, next) => {
  getUsers()
    .then((result) => {
      res.send({ users: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllUsersByUsername = (req, res, next) => {
  const { username } = req.params;
  getUsersByUsername(username)
    .then((result) => {
      res.send({ user: result });
    })
    .catch((err) => {
      next(err);
    });
};
