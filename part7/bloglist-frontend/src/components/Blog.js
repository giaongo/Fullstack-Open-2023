import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLike } from '../reducers/blogReducer';
import { removeBlog } from '../reducers/blogReducer';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const [visibleBlogDetail, setVisibleBlogDetail] = useState(false);
  const [likeBlogNumber, setLikeBlogNumber] = useState(blog.likes);
  const user = useSelector((state) => state.user);
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
  return (
    <div style={blogStyle} className="blog">
      <div style={{ color: '#02507a', fontWeight: 'bold' }}>
        <span>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
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
          <div>{blog.comments.length} comments</div>
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
                onClick={async () => dispatch(removeBlog(blog))}
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
};
export default Blog;
