import axios from 'axios';
const baseUrl = 'api/blogs';

const getAll = async (token) => {
  try {
    const config = {
      headers: { Authorization:token }
    };
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    throw new Error('ErrorGettingUser', error);
  }
};

export default { getAll };