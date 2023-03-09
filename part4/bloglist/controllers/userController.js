const userRouter = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
require('express-async-errors');

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  if(!password || password.length < 3) {
    return response.status(400).json({ error:'Password is invalid' });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({ username, name, hashedPassword });
  const result = await newUser.save();
  return response.status(201).json(result);
});

module.exports = userRouter;