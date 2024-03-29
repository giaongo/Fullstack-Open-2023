import { useEffect, useRef } from 'react';
import Blog from './Blog';
import { getAllBlogs } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import Toggleble from '../components/Toggleble';
import NewBlogForm from '../components/NewBlogForm';
const BlogsDisplay = () => {
  // get all current blogs' state
  const blogList = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <div style={{ marginTop: '80px', padding: '20px' }}>
      <h2>blogs</h2>
      <Toggleble buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlogForm data={blogFormRef} />
      </Toggleble>
      {blogList.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsDisplay;
