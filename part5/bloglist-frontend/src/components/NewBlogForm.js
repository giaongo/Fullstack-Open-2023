import PropTypes from 'prop-types';

const NewBlogForm = ({ title, author, url, setTitle, setAuthor, setUrl, handleFormSubmmision }) => {
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleFormSubmmision}>
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
  title: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string,
  setTitle: PropTypes.func,
  setAuthor: PropTypes.func,
  setUrl: PropTypes.func,
  handleFormSubmmision: PropTypes.func,

};

export default NewBlogForm;