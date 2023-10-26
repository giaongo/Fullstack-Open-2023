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
  }, [dispatch]);

  return (
    <div>
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
