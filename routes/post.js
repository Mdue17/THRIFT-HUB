const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postController = require("../controllers/post");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.get('/dashboard', ensureAuth, postController.dashboard);

router.post("/createPost", upload.single("file"), postController.createPost);

router.delete('/deletePost', ensureAuth, postController.deletePost);

router.get('/editButton/:id', ensureAuth, postController.editButton);

router.put('/editPost/:id', ensureAuth, postController.editPost);

router.put('/postHeartIncreaseDecreaseID', ensureAuth, postController.postHeartIncreaseDecreaseID);

router.put('/postHeartIncreaseDecreaseID', ensureAuth, postController.postHeartIncreaseDecreaseID);

router.get('/:id', ensureAuth, postController.getSinglePost)

//router.put("/likePost/:id", postsController.likePost);

// router.delete("/deletePost/:id", postsController.markSold);

module.exports = router;
