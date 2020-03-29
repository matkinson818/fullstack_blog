// Get all blogs
exports.getBlogs = (req, res, next) => {
    res.status(200).json({ msg: "All blogs" });
};

// Get a single blog
exports.getBlog = (req, res, next) => {
    res.status(200).json({ msg: "Blog one" });
};

// Delete a blog
exports.deleteBlog = (req, res, next) => {
    res.status(200).json({ msg: `Blog post ${req.params.id} deleted`});
};

// Create a blog
exports.createBlog = (req, res, next) => {
    res.status(200).json({ msg: "Blog created"})
};

// Update blog
exports.updateBlog = (req, res, next) => {
    res.status(200).json({ msg: `Blog post ${req.params.id} updated`})
}