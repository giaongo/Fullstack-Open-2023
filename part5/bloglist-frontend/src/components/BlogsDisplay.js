import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import PropTypes from 'prop-types';

const BlogsDisplay = ({ token, update }) => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async (token) => {
    try {
      const response = await blogService.getAll(token);
      setBlogs(response);
    } catch (error) {
      console.error('ErrorInGettingBlogs', error);
    }
  };

  useEffect(() => {
    getAllBlogs(token);
  }, [update]);

  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

BlogsDisplay.propTypes = {
  token:PropTypes.string,
  update:PropTypes.bool
};
export default BlogsDisplay;