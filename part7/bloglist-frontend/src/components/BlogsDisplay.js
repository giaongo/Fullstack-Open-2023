import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import { getAllBlogs } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const BlogsDisplay = ({ token, user }) => {
  // get all current blogs' state
  const blogList = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
        const result = await blogService.deleteBlog(blog.id, token);
        console.log('Deleting result', result);
      }
    } catch (error) {
      console.error('ErrorDeletingBlog', error.message);
    }
  };
  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <div>
      {blogList.map((blog) => (
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user} />
      ))}
    </div>
  );
};

BlogsDisplay.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
};
export default BlogsDisplay;
