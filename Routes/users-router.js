const usersRouter = require(`express`).Router();
const {
  getAllUsers,
  getAllUsersByUsername,
} = require(`../controllers/users.controllers`);

usersRouter.get("/", getAllUsers);

usersRouter.route("/:username").get(getAllUsersByUsername);

module.exports = usersRouter;
