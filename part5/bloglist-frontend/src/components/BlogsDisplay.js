import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import PropTypes from 'prop-types';

const BlogsDisplay = ({ token, update, setUpdate, user }) => {
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

  useEffect(() => {
    getAllBlogs(token);
  }, [update]);

  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          update={update}
          setUpdate={setUpdate}
          user={user}
          token={token}/>
      ))}
    </>
  );
};

BlogsDisplay.propTypes = {
  token: PropTypes.string,
  update: PropTypes.bool,
  setUpdate:PropTypes.func,
  user:PropTypes.object
};
export default BlogsDisplay;
