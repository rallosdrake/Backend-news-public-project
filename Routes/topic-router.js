const topicRouter = require(`express`).Router();
const { getAllTopics, postTopics } = require(`../controllers/topic.controller`);

topicRouter.route(`/`).get(getAllTopics).post(postTopics);

module.exports = topicRouter;
