const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.get('/dashboard', ensureAuth, postController.dashboard)

// router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.delete('/deletePost', ensureAuth, postController.deletePost)

router.get('/editButton/:id', ensureAuth, postController.editButton)

router.put('/editPost/:id', ensureAuth, postController.editPost)

router.get('/:id', ensureAuth, postController.getSinglePost)

//router.put("/likePost/:id", postsController.likePost);

// router.delete("/deletePost/:id", postsController.markSold);

module.exports = router;
