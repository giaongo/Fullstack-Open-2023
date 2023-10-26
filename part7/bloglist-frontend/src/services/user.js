import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/users/';

const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response;
  } catch (error) {
    throw new Error('ErrorGettingAllUsers: ' + error.response.data.error);
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(baseUrl + id);
    return response;
  } catch (error) {
    throw new Error('ErrorGettingUserById: ' + error.response.data.error);
  }
};
export default { getAllUsers, getUserById };
