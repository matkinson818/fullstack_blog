const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Title is required'],
        trim: true
    },
    slug: {
        type: String
    },
    author: String,
    post: {
        type: String,
        required: [true, 'Post is required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    meta: {
        votes: Number
    }
});

//create blog slug
blogSchema.pre('save', function(next) {
    console.log('Slugify ran', this.title)
    this.slug = slugify(this.title, { replacement: '_', lower: true })
    next();
})

module.exports = mongoose.model('Blog', blogSchema);