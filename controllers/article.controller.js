const {
  fetchArticleById,
  changeArticleById,
  fetchArticles,
} = require("../MODELS/article.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((result) => {
      res.send({ article: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  changeArticleById(article_id, inc_votes)
    .then((result) => {
      res.send({ article: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  fetchArticles()
    .then((result) => {
      res.send({ articles: result });
    })
    .catch((err) => {
      next(err);
    });
};
