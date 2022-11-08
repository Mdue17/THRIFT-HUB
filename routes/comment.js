const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth")


//Post Routes - simplified for now

router.post("/createComment/:id", commentController.createComment);

router.delete("/deleteComment/:postid/:commentid", commentController.deleteComment);

router.get('/editCommentButton/:id', ensureAuth, commentController.editCommentButton);

router.put('/editComment/:id', ensureAuth, commentController.editComment);

router.put('/commentHeartIncreaseDecreaseID', ensureAuth, commentController.commentHeartIncreaseDecreaseID);

router.put('/commentHeartBreakIncreaseDecreaseID', ensureAuth, commentController.commentHeartBreakIncreaseDecreaseID);


//router.put("/likePost/:id", postsController.likePost);

//router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
