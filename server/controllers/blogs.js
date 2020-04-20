const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Blog = require('../models/Blog');


// Get all blogs
exports.getBlogs = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.find();

    res.status(200).json({
        msg: 'success',
        data: blogs
    })
});

// Get a single blog
exports.getBlog = asyncHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if(!blog) {
        return next(new ErrorResponse('Blog Not Found', 400))
    }

    res.status(200).json({
        msg: 'success',
        data: blogs
    })
}); 

// Delete a blog
exports.deleteBlog = asyncHandler(async (req, res, next) => {
    const blogs = Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
        msg: 'success',
        data: {}
    })
});

// Create a blog
exports.createBlog = asyncHandler(async (req, res, next) => {
    const blogs= await Blog.create(req.body);

    res.status(200).json({
        msg: 'success',
        data: blogs
    });
});

// Update blog
exports.updateBlog = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        msg: 'success',
        data: blogs
    })
});