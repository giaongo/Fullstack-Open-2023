const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blogModel');

const initialBlogs = [
  {
    title:'HTML is easy',
    author: 'Giao',
    url:'https://github.com/giaongo',
    likes:5
  },
  {
    title:'Be positive',
    author:'Eugine',
    url:'https://github.com/giaongo',
    likes:10
  }
];

beforeEach(async () => {
  try {
    await Blog.deleteMany({});
    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    await Promise.all(blogObjects.map(async (blog) => await blog.save()));
  } catch (error) {
    console.error('errorInitialisingTestDatabase', error);
  }
});

describe('Get All Blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  },);

  test('returned unique identidier in right format', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

describe('Post A Blog', () => {
  test('create and save a blog', async () => {
    const sampleBlog = {
      title:'How to draw a circle',
      author:'Eugine',
      url:'https://github.com/giaongo',
      likes:0
    };
    await api.post('/api/blogs').send(sampleBlog).expect(201);
    const getResponse = await api.get('/api/blogs');
    expect(getResponse.body.length).toHaveLength(initialBlogs.length + 1);
  });
});

afterAll(async() => {
  await mongoose.connection.close();
});