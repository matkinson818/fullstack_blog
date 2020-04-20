const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogs');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
.route('/')
.get(getBlogs)
.post(protect, authorize('admin'), createBlog);

router
.route('/:id')
.get(getBlog)
.put(protect, authorize('admin'), updateBlog)
.delete(protect, authorize('admin'), deleteBlog);

module.exports = router;