const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog')
const User = require('../models/Users')

// Get all blog
router.get('/', (req, res) => {
    Blog.find({}).then((blogs) =>{
        res.send(blogs);
    })
});

//Create an comment on blog
router.post('/post/:id', (req, res) => {
    const post = post.findOne({ id: req.params.id });

    let comment = new Comment();
    comment.content = req.body.content;
    comment.post = post._id;
    comment.save();

    post.comment.push(comment._id);
    post.save();

    res.send(comment);
})

// Get all comments from blogs
router.get('/post/:id', (req, res) => {
    res.send({ok: true});
})

// Add new blog
router.post('/posts', (req, res, next) => {
    Blog.create(req.body).then((blog) => {
        res.send(blog);
    }).catch(next);
});

// Update a current blog
router.put('/post/:id', (req, res, next) => {
    Blog.findByIdAndUpdate({_id: req.params.id}).then((blog) => {
        Blog.findOne({_id: req.params.id}).then(() => {
            res.send(blog)
        })
    })
});

// Delete a blog
router.delete('/posts/:id', (req, res, next) => {
    Blog.findByIdAndRemove({_id: req.params.id}).then((blog) => {
        res.send(Blog)
    })
});

module.exports = router;
