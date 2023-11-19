const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    text: {
        type: String,
        maxlength: 280
    },
    commentable: {
        type: Boolean
    },
    reply: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }
})

const Comment = model('comment', commentSchema)

module.exports = Comment