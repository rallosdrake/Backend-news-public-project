const {
  fetchArticleById,
  changeArticleById,
  fetchArticles,
  fetchCommentsById,
  addCommentsById,
  postArticle,
  deleteArticle,
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
  const { sort_by, order, topic, limit, page } = req.query;
  fetchArticles(sort_by, order, topic, limit, page)
    .then((result) => {
      res.send({ articles: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  const { limit, page } = req.body;
  fetchCommentsById(article_id, limit, page)
    .then((result) => {
      res.send({ comments: result });
    })
    .catch((err) => {
      next(err);
    });
};
exports.postCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;

  addCommentsById(article_id, body, username)
    .then((result) => {
      res.send({ comment: result });
    })
    .catch((err) => {
      next(err);
    });
};
exports.postNewArticle = (req, res, next) => {
  const input = req.body;
  postArticle(input)
    .then((result) => {
      res.status(201).send({ result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticle(article_id)
    .then((result) => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
