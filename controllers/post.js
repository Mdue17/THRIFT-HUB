const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/post");
const User = require("../models/user")
const Comments = require("../models/comment")
const Wall = require("../models/wall")
const WallComments = require("../models/wallComments")
const Comment = require("../models/comment");


module.exports = {
  dashboard: async (req,res) => {
    try {
      let allUserPosts = await Post.find({
        loginID: req.user.loginID,
      }).sort({_id:-1}).lean()
      let postsWithUserComments = await Comments.find({
        loginID: req.user.loginID,
      }).populate("post").sort({_id:-1}).lean()

      
      let wallPosts = await Wall.find({
        loginID: req.user.loginID,
      }).sort({_id:-1}).lean()

      
      let users = await User.find({}).lean()

      let wallPostsWithUserComments = await WallComments.find({
        loginID: req.user.loginID,
      }).populate("wall");


      res.render("dashboard.ejs", {
        allUserPosts,
        postsWithUserComments,
        wallPosts,
        users,
        wallPostsWithUserComments,
      });
    } catch (err){
      console.log(err);
      res.render("error/500")
    }
  },

  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        postType: req.body.postType,
        body: req.body.body,
        cloudinaryId: result.public_id,
        description: req.body.description,
        price: req.body.price,
        loginID: req.user.loginID,
      });
      console.log("Post has been added!");
      res.redirect("/profile/dashboard");
    } catch (err) {
      console.log(err);
      res.render("error/500")
    }
  },

  deletePost : async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

  editButton: async (req, res) => {
    try {
      let post = await Post.findById({
        _id: req.params.id,
      }).lean();

      if (!post) {
        return res.render("error/404");
      }

      if (post.loginID !== req.user.loginID) {
        res.redirect("/post/dashboard");
      } else {
      }
      res.render("editPost", {
        post,
      });
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },

  editPost: async (req, res) => {
    try {
      let post = await Post.findOne({
        _id: req.params.id,
      }).lean();

      if (!post){
        return res.render("error/404");
      }

      if (post.loginID !== req.user.loginID) {
        res.redirect("/dashboard");
      } else {
        post = await Post.findOneAndUpdate(
          {
          _id: req.params.id,
        },
        req.body,
        {
          new: true,
          runValidators: true,
        }
        );
        res.redirect("/dashboard");
      }
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },

  getSinglePost: async (req, res) => {

    try{
      let post = await Post.findById({
        _id: req.params.id,
      }).lean();
      let users = await User.find({}).lean()

      let postComments = await Comments.find().lean()

      res.render('SinglePost', {
        post: post,
        postComments: postComments,
        users: users
      })
    } catch (err){
      console.error(err);
      return res.render("error/500")
    }
  },
  
  postHeartIncreaseDecreaseID: async (req, res)=> {
    try {
      let post = await Post.find({
        _id: req.body.postHeartIncreaseDecreaseID,
      });
      let check;
      post.forEach((post) => {
        check = post.heart.includes(req.user.loginID);
      });

      if (!check) {
        await Post.findOneAndUpdate(
          {
            _id: req.body.postHeartIncreaseDecreaseID,
          },
          {
            $push: {
              heart: req.user.loginID,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        console.log(
          `Post ${req.body.postHeartIncreaseDecreaseID} heart's increased`
        );
      }else{
        await Post.findOneAndUpdate(
          {
            _id: req.body.postHeartIncreaseDecreaseID,
          },
          {
            $pull: {
              heart: req.user.loginID,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(
          `Post ${req.body.postHeartIncreaseDecreaseID} heart's decreased`
        );
      }
      res.json(`Post ${req.body.postHeartIncreaseDecreaseID} heart's updated`);
    } catch (err){
      console.log(err);
      res.render("error/500");
    }
  },

  postHeartBreakIncreaseDecreaseID: async (req,res) => {
    try {
      let post = await Post.find({
        _id: req.body.postHeartBreakIncreaseDecreaseID,
      });
      let check;
      post.forEach((Post) => {
        check = post.heartBreak.includes(req.user.loginID);
      });

      if(!check) {
        await Post.findOneAndUpdate(
          {
            _id: req.body.postHeartBreakIncreaseDecreaseID,
          },
          {
            $push: {
              heartBreak: req.user.loginID,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        console.log(
          `Post ${req.body.postHeartBreakIncreaseDecreaseID} heartbreak's decreased`
        );
      } else {
        await Post.findOneAndUpdate(
          {
            _id: req.body.postHeartBreakIncreaseDecreaseID,
          },
          {
            $pull: {
              heartBreak: req.user.loginID,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(
          `Post ${req.body.postHeartBreakIncreaseDecreaseID} heartbreak's decreased`
        );
      }
      res.json(
        `Post ${req.body.postHeartBreakIncreaseDecreaseID} hearbreak's updated`
      );
    } catch (err) {
      console.log(err);
      res.render("error/500")
    }
    
  },

  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getPost: async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "asc"}).lean();
  //     res.render("post.ejs", { post: post, user: req.user, comments: comments });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

 
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

};
