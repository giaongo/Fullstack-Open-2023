import PropTypes from 'prop-types';
import { useState } from 'react';

const Blog = ({ blog }) => {
  const [visibleBlogDetail, setVisibleBlogDetail] = useState(false);

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
    <div style={blogStyle}>
      <div style={{ color:'#02507a', fontWeight:'bold' }}>
        {blog.title} - {blog.author}
        <button onClick={toggleDetailVisibiity} style={viewBtnStyle}>
          {visibleBlogDetail ? 'hide' : 'view'}
        </button>
      </div>
      {visibleBlogDetail && (
        <>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>likes {blog.likes}</div>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};
export default Blog;
