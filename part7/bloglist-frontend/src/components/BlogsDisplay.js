import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import { getAllBlogs } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const BlogsDisplay = ({ token, user, update, setUpdate }) => {
  const blogList = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const updates = useSelector((state) => state.update);
  const increaseLikeNumber = async (likeNum, blog) => {
    try {
      const newLike = likeNum + 1;
      const result = await blogService.updateLike(blog.id, newLike);
      setUpdate(!update);
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
    dispatch(getAllBlogs());
  }, [updates]);

  return (
    <div>
      {blogList.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          increaseLikeNumber={increaseLikeNumber}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

BlogsDisplay.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
  update: PropTypes.bool,
  setUpdate: PropTypes.func,
};
export default BlogsDisplay;
