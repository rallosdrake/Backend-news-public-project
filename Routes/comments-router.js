const commentsRouter = require(`express`).Router();
const {
  deleteCommentById,
  patchByCommentId,
} = require(`../controllers/comments.controller`);

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentById)
  .patch(patchByCommentId);

module.exports = commentsRouter;
