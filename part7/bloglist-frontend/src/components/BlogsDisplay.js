import { useEffect } from 'react';
import Blog from './Blog';
import { getAllBlogs } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';

const BlogsDisplay = () => {
  // get all current blogs' state
  const blogList = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <div>
      {blogList.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsDisplay;
