import { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const NewBlogForm = ({ token, updateFunction }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');


  const handleBlogFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await blogService.addNewBlog(token, { title, author, url });
      if(result.status === 201) {
        updateFunction.setUpdate(!updateFunction.update);
        setTitle('');
        setAuthor('');
        setUrl('' );
      }
    } catch(error) {
      console.error('ErrorAddingNewBlog', error);
    }
  };
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogFormSubmit}>
        <div>
            title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value) }
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit" style={{ margin:10 }}>Create</button>
      </form>
    </div>
  );
};
NewBlogForm.propTypes = {
  token: PropTypes.string,
  updateFunction: PropTypes.object
};

export default NewBlogForm;