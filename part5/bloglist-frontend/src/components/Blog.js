import PropTypes from 'prop-types';
import { useState } from 'react';
import blogService from '../services/blogs';
const Blog = ({ blog, update, setUpdate, user, token }) => {
  const [visibleBlogDetail, setVisibleBlogDetail] = useState(false);
  const [likeBlogNumber, setLikeBlogNumber] = useState(blog.likes);
  const visibleDeleteBtn = user && blog.user.id === user.id;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const viewBtnStyle = {
    marginLeft: 10,
  };
  const toggleDetailVisibiity = () => {
    setVisibleBlogDetail(!visibleBlogDetail);
  };

  const increaseLikeNumber = async () => {
    try {
      const newLike = likeBlogNumber + 1;
      const result = await blogService.updateLike(blog.id, newLike);
      setLikeBlogNumber(result.likes);
      setUpdate(!update);
    } catch (error) {
      console.error('ErrorLikingBlog', error.message);
    }
  };

  const deleteBlog = async() => {
    try {
      if(window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
        const result = await blogService.deleteBlog(blog.id, token);
        console.log('Deleting result', result);
        setUpdate(!update);
      }
    } catch (error) {
      console.error('ErrorDeletingBlog', error.message);
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      <div style={{ color:'#02507a', fontWeight:'bold' }}>
        {blog.title} - {blog.author}
        <button onClick={toggleDetailVisibiity} style={viewBtnStyle}>
          {visibleBlogDetail ? 'hide' : 'view'}
        </button>
      </div>
      {visibleBlogDetail && (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            likes {likeBlogNumber}
            <button style={{
              backgroundColor:'#bee3f7',
              marginLeft: 5,
              padding:5,
              border:0,
              borderRadius:5 }} onClick={increaseLikeNumber}>Like</button>
          </div>
          <div>{blog.user.name}</div>
          {visibleDeleteBtn && (
            <>
              <button style={{
                backgroundColor:'red',
                color:'white',
                border:'none',
                margin:10,
                padding:5,
                borderRadius:5,
                cursor:'pointer' }} onClick={deleteBlog}>Delete</button>
            </>

          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  update:PropTypes.bool,
  setUpdate:PropTypes.func,
  user:PropTypes.object,
  token:PropTypes.string
};
export default Blog;
