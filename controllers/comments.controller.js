const {
  removeComments,
  changeCommentById,
} = require("../MODELS/comments.model");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeComments(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  changeCommentById(comment_id, inc_votes)
    .then((result) => {
      res.send({ comment: result });
    })
    .catch((err) => {
      next(err);
    });
};
