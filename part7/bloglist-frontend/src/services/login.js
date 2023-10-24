import axios from 'axios';
const baseUrl = 'api/login';

const login = async (userData) => {
  try {
    const response = await axios.post(baseUrl, userData);
    return response;
  } catch (e) {
    throw new Error('ErrorLoginUser: ' + e.response.data.error);
  }
};

export default { login };
