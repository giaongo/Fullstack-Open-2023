import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { updateLike } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import { displayNotification } from '../reducers/notificationReducer';

const Detail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [update, setUpdate] = useState(false);
  const [likeBlogNumber, setLikeBlogNumber] = useState(null);
  const dispatch = useDispatch();
  const getBlog = async () => {
    try {
      console.log('function getBlog is called');
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
    console.log('useEffect is called');
  }, [update]);

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
          <h3>comments</h3>
          <CommentForm id={blog.id} update={update} setUpdate={setUpdate} />
          <ul>
            {blog.comments.length !== 0 &&
              blog.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const CommentForm = ({ id, update, setUpdate }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const addComment = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.pushComment(id, comment);
      dispatch(
        displayNotification(
          {
            message: `Comment added to ${response.data.title}`,
            status: 'success',
          },
          5000,
        ),
      );
      setUpdate(!update);
      setComment('');
    } catch (error) {
      console.error('error adding comment', error.message);
      dispatch(
        displayNotification(
          {
            message: error.message,
            status: 'error',
          },
          5000,
        ),
      );
    }
  };

  return (
    <div>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  id: PropTypes.string.isRequired,
  update: PropTypes.bool,
  setUpdate: PropTypes.func,
};

export default Detail;
