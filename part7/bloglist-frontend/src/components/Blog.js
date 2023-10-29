import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLike } from '../reducers/blogReducer';
import { removeBlog } from '../reducers/blogReducer';
import { Link } from 'react-router-dom';
import { Button, CardActions, CardContent, Typography } from '@mui/material';

const Blog = ({ blog }) => {
  const [visibleBlogDetail, setVisibleBlogDetail] = useState(false);
  const [likeBlogNumber, setLikeBlogNumber] = useState(blog.likes);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const visibleDeleteBtn = blog && user ? blog.user.id === user.id : false;

  const blogStyle = {
    paddingTop: 10,
    padding: 15,
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
    <CardContent style={blogStyle} className="blog">
      <div style={{ color: '#02507a', fontWeight: 'bold' }}>
        <Typography variant="h6" component="span">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </Typography>
        <CardActions>
          <Button
            onClick={toggleDetailVisibiity}
            style={viewBtnStyle}
            className="detailBtn"
          >
            {visibleBlogDetail ? 'hide' : 'view'}
          </Button>
        </CardActions>
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
          <Typography variant="body2">{blog.user.name}</Typography>
          <Typography variant="body2">
            {blog.comments.length} comments
          </Typography>
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
    </CardContent>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};
export default Blog;
