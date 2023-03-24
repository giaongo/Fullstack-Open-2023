import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import PropTypes from 'prop-types';

const BlogsDisplay = ({ token, user, update, setUpdate }) => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async (token) => {
    try {
      const response = await blogService.getAll(token);
      response.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes);
      setBlogs(response);
    } catch (error) {
      console.error('ErrorInGettingBlogs', error);
    }
  };

  const increaseLikeNumber = async (likeNum, blog) => {
    try {
      const newLike = likeNum + 1;
      const result = await blogService.updateLike(blog.id, newLike);
      return result.likes;
    } catch (error) {
      console.error('ErrorLikingBlog', error.message);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
        const result = await blogService.deleteBlog(blog.id, token);
        console.log('Deleting result', result);
        setUpdate(!update);
      }
    } catch (error) {
      console.error('ErrorDeletingBlog', error.message);
    }
  };
  useEffect(() => {
    getAllBlogs(token);
  }, [update]);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          increaseLikeNumber={increaseLikeNumber}
          deleteBlog = {deleteBlog}
          user={user}/>
      ))}
    </div>
  );
};

BlogsDisplay.propTypes = {
  token: PropTypes.string,
  user:PropTypes.object,
  update:PropTypes.bool,
  setUpdate:PropTypes.func
};
export default BlogsDisplay;
