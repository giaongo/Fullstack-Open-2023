const blogRouter = require("express").Router();
const Blog = require("../models/blogModel");
const { userExtractor } = require("../utils/middleware");
require("express-async-errors");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.status(201).json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  response.status(201).json(blog);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const blogToAdd = request.body;
  const user = request.user;
  if (!blogToAdd.title || !blogToAdd.url) {
    return response.status(400).json({ error: "missing data" });
  }
  blogToAdd.likes = blogToAdd.likes || 0;
  const updatedUserInfoBlog = { ...request.body, user: user._id };

  const blog = new Blog(updatedUserInfoBlog);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response
    .status(201)
    .json(await result.populate("user", { username: 1, name: 1 }));
});

blogRouter.post("/:id/comments", async (request, response) => {
  const commentToAdd = request.body;
  const blogId = request.params.id;
  if (!commentToAdd.comment) {
    return response.status(400).json({ error: "missing data" });
  }
  const blog = await Blog.findById(blogId);
  blog.comments = blog.comments.concat(commentToAdd.comment);
  const result = await blog.save();
  if (result !== null) {
    response.status(201).json(result);
  } else {
    response.status(404).json({ error: "comment added failed" });
  }
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogIdToDelete = request.params.id;
  const user = request.user;
  const blog = await Blog.findById(blogIdToDelete);
  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(blogIdToDelete);
    return response.status(201).json({ message: "deleted successfully" });
  } else {
    return response.status(401).json({ error: "Unauthorized user" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const blogIdToUpdate = request.params.id;
  const likesNumber = {
    likes: request.body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogIdToUpdate,
    likesNumber,
    { new: true }
  ).populate("user", { username: 1, name: 1 });
  response.status(201).json(updatedBlog);
});
module.exports = blogRouter;
