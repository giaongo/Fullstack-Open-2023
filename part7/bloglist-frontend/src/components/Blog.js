import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLike } from '../reducers/blogReducer';

const Blog = ({ blog, user, deleteBlog }) => {
  const [visibleBlogDetail, setVisibleBlogDetail] = useState(false);
  const [likeBlogNumber, setLikeBlogNumber] = useState(blog.likes);
  const dispatch = useDispatch();
  const visibleDeleteBtn = blog && user ? blog.user.id === user.id : false;

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
  console.log('visible delete button for ' + blog.title, visibleDeleteBtn);
  console.log('user id for' + blog.title, user.id);
  console.log('blog owner id for ' + blog.title, blog.user.id);

  return (
    <div style={blogStyle} className="blog">
      <div style={{ color: '#02507a', fontWeight: 'bold' }}>
        <span>
          {blog.title} - {blog.author}
        </span>
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
          <div className="likeSection">
            likes {likeBlogNumber}
            <button
              id="likeBtn"
              style={{
                backgroundColor: '#bee3f7',
                marginLeft: 5,
                padding: 5,
                border: 0,
                borderRadius: 5,
              }}
              onClick={async () => {
                setLikeBlogNumber(likeBlogNumber + 1);
                dispatch(updateLike(blog));
              }}
            >
              Like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {visibleDeleteBtn && (
            <>
              <button
                id="deleteBtn"
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
  deleteBlog: PropTypes.func,
};
export default Blog;
