const testingRouter = require('express').Router();
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
require('express-async-errors');

testingRouter.post('/reset', async(request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  response.status(204).end();
});
module.exports = testingRouter;