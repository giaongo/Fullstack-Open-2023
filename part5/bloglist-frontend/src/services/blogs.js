import axios from 'axios';
const baseUrl = 'api/blogs/';

const getAll = async (token) => {
  try {
    const config = {
      headers: { Authorization:token }
    };
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    throw new Error('ErrorGettingUser: ' + error.response.data.error);
  }
};
const addNewBlog = async (token, newBlog) => {
  try {
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
    const response = await axios.post(baseUrl, newBlog, config);
    return response;
  } catch(error) {
    throw new Error('ErrorAddingNewBlog: ' + error.response.data.error);
  }
};
const updateLike = async (blogId, likeNum) => {
  try {
    const response = await axios.put(baseUrl + blogId,{ likes:likeNum });
    return response.data;
  } catch(error) {
    throw new Error('ErrorUpdatingLike: ' + error.response.data.error);
  }
};
const deleteBlog = async(blogId, token) => {
  try {
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
    const response = await axios.delete(baseUrl + blogId, config);
    return response.data;
  } catch (error) {
    throw new Error('ErrorDeletingABlog: ' + error.response.data.error);
  }
};

export default { getAll, addNewBlog, updateLike, deleteBlog };