import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const NewBlogForm = ({ data }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleBlogFormSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(createBlog({ title, author, url }));
      data.current.toggleVisibility();
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.log('ErrorAddingNewBlog', error);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogFormSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            id="title-input"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
            id="author-input"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
            id="url-input"
          />
        </div>
        <button type="submit" style={{ margin: 10 }} id="createBlogBtn">
          Create
        </button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  createNewBlog: PropTypes.func,
  data: PropTypes.object,
};

export default NewBlogForm;
