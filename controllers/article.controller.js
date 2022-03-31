const {
  fetchArticleById,
  changeArticleById,
  fetchArticles,
  fetchComments,
  addCommentsById,
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

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  fetchComments(article_id)
    .then((result) => {
      res.send({ comments: result });
    })
    .catch((err) => {
      next(err);
    });
};
exports.postCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req.body;
  const { username } = req.body;
  addCommentsById(article_id, body, username)
    .then((result) => {
      res.send({ comment: result });
    })
    .catch((err) => {
      next(err);
    });
};
