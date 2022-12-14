const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        trim: true,
        required: true
    },
    loginID: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    heart: [],

    heartBreak: [],
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
 })

 module.exports = mongoose.model('Comment', commentSchema)