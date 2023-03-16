import axios from 'axios';
const baseUrl = 'api/login';

const login = async(userData) => {
  try {
    const response = await axios.post(baseUrl, userData);
    return response;
  } catch (error) {
    throw new Error('ErrorLoginUser', error);
  }
};

export default { login };