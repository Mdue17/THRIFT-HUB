const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body:{
    type: String,
    required: true,
    maxLength: 250,
    trim: true,
  },
  postType: {
    type: String,
    default: 'aww',
    enum: ['aww', 'thankful', 'blessing', 'remorseful', 'cranky', 'free', 'fortunate', 'humbled'],
  },

  heart: [],

  heartBreak: [],
  // image: {
  //   type: String,
  //   require: true,
  // },
  loginID: {
    type: String,
    required: true,
  },

  // cloudinaryId: {
  //   type: String,
  //   require: true,
  // },
  // description: {
  //   type: String,
  //   required: true,
  //   maxLength: 400,
  //   trim: true,
  // },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  // price: {
  //   type: Number,
  //   require: true,
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
