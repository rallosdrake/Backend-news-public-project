const topicRouter = require(`express`).Router();
const { getAllTopics } = require(`../controllers/topic.controller`);

topicRouter.get(`/`, getAllTopics);

module.exports = topicRouter;
