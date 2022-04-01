const articlesRouter = require(`express`).Router();
const {
  getArticleById,
  patchByArticleId,
  getAllArticles,
  getCommentsById,
  postCommentsById,
  postNewArticle,
  deleteByArticleId,
} = require("../controllers/article.controller");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchByArticleId)
  .delete(deleteByArticleId);

articlesRouter.route(`/`).get(getAllArticles).post(postNewArticle);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsById)
  .post(postCommentsById);

module.exports = articlesRouter;
