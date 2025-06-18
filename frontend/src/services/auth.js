import axios from 'axios';

export async function login(username, password) {
  const response = await axios.post('/api/auth/login', {
    username,
    password,
  });
  return response.data.token;
}