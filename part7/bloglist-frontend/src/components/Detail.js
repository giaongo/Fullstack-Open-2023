import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { updateLike } from '../reducers/blogReducer';
updateLike;
const Detail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likeBlogNumber, setLikeBlogNumber] = useState(null);
  const dispatch = useDispatch();
  const getBlog = async () => {
    try {
      const response = await blogService.getBlogById(id);
      console.log('response is', response.data);
      setBlog(response.data);
      setLikeBlogNumber(response.data.likes);
    } catch (error) {
      console.error('error getting blog', error.message);
    }
  };
  useEffect(() => {
    getBlog(id);
  }, []);

  return (
    <div>
      {blog !== null && (
        <div>
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a>
          <div>
            {likeBlogNumber} likes
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
          <p>author: {blog.author}</p>
          <p>added by {blog.user.username}</p>
        </div>
      )}
    </div>
  );
};

export default Detail;
