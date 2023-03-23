import PropTypes from 'prop-types';
import { useState } from 'react';
const Blog = ({ blog, user, increaseLikeNumber , deleteBlog }) => {
  const [visibleBlogDetail, setVisibleBlogDetail] = useState(false);
  const [likeBlogNumber, setLikeBlogNumber] = useState(blog.likes);
  // const visibleDeleteBtn = blog && user ? blog.user.id === user.id : false;
  const visibleDeleteBtn = false;
  console.log('blog is', blog,'user is', user);
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


  return (
    <div style={blogStyle} className="blog">
      <div style={{ color: '#02507a', fontWeight: 'bold' }}>
        {blog.title} - {blog.author}
        <button
          onClick={toggleDetailVisibiity}
          style={viewBtnStyle}
          className="detailBtn"
        >
          {visibleBlogDetail ? 'hide' : 'view'}
        </button>
      </div>
      {visibleBlogDetail && (
        <div className="togglableContent">
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            likes {likeBlogNumber}
            <button
              style={{
                backgroundColor: '#bee3f7',
                marginLeft: 5,
                padding: 5,
                border: 0,
                borderRadius: 5,
              }}
              onClick={async () => {
                const likes = await increaseLikeNumber(likeBlogNumber,blog);
                setLikeBlogNumber(likes);
              }}
            >
              Like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {visibleDeleteBtn && (
            <>
              <button
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  margin: 10,
                  padding: 5,
                  borderRadius: 5,
                  cursor: 'pointer',
                }}
                onClick={async () => await deleteBlog(blog)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object,
  increaseLikeNumber: PropTypes.func,
  deleteBlog: PropTypes.func,
};
export default Blog;
