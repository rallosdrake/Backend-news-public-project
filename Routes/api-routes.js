const apiRouter = require(`express`).Router();
const topicRouter = require(`./topic-router`);
const usersRouter = require(`./users-router`);
const articlesRouter = require(`./article-router`);
const commentRouter = require(`./comments-router`);

const { getApi } = require(`../controllers/api.controllers`);
apiRouter.get(`/`, getApi);
apiRouter.use(`/topics`, topicRouter);
apiRouter.use(`/users`, usersRouter);
apiRouter.use(`/articles`, articlesRouter);
apiRouter.use(`/comments`, commentRouter);

module.exports = apiRouter;
