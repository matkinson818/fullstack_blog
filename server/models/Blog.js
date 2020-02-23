const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    author: String,
    post: {
        type: String,
        required: [true, 'Post is required']
    },
    date: {
        type: Date,
        default: Date.now
    }
    // meta: {
    //     votes: Number
    // }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;