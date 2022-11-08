const mongoose = require('mongoose')

const WallCommentsSchema = new mongoose.Schema({
    CaptionComment: {
        type: String,
        trim: true,
        required: true,
    },

    loginID: {
        type: String,
        required: true,
    },
    wall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wall',
    },
    heart: [],
    heartBreak: [],

    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('WallComments', WallCommentsSchema)