import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs/';

const getAll = async (token) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    throw new Error('ErrorGettingUser: ' + error.response.data.error);
  }
};

const getBlogById = async (blogId) => {
  try {
    const response = await axios.get(baseUrl + blogId);
    return response;
  } catch (error) {
    throw new Error('ErrorGettingBlogById: ' + error.response.data.error);
  }
};

const addNewBlog = async (token, newBlog) => {
  try {
    const config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    const response = await axios.post(baseUrl, newBlog, config);
    return response;
  } catch (error) {
    throw new Error('ErrorAddingNewBlog: ' + error.response.data.error);
  }
};
const updateLike = async (blog) => {
  try {
    const response = await axios.put(baseUrl + blog.id, {
      likes: blog.likes + 1,
    });
    return response;
  } catch (error) {
    throw new Error('ErrorUpdatingLike: ' + error.response.data.error);
  }
};
const deleteBlog = async (blogId, token) => {
  try {
    const config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    const response = await axios.delete(baseUrl + blogId, config);

    return response;
  } catch (error) {
    throw new Error('ErrorDeletingABlog: ' + error.response.data.error);
  }
};

const pushComment = async (blogId, comment) => {
  try {
    const response = await axios.post(baseUrl + blogId + '/comments', {
      comment,
    });
    return response;
  } catch (error) {
    throw new Error('ErrorPushingComment: ' + error.response.data.error);
  }
};

export default {
  getAll,
  addNewBlog,
  updateLike,
  deleteBlog,
  getBlogById,
  pushComment,
};
