import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/auth/'
    : '//localhost:3030/api/auth/';

export const authService = {
  login,
  signup,
  logout,
};

async function login({ username, password }) {
  try {
    const res = await axios.post(BASE_URL + 'login', { username, password });
    return res.data;
  } catch (err) {
    console.error('Err while logging in', err);
    throw err;
  }
}

async function signup({ username, password, fullname }) {
  try {
    const res = await axios.post(BASE_URL + 'signup', {
      username,
      password,
      fullname,
    });
    return res.data;
  } catch (err) {
    console.error('Err while signing up', err);
    throw err;
  }
}

async function logout() {
  try {
    const res = await axios.post(BASE_URL + 'logout');
    return res.data;
  } catch (err) {
    console.error('Err while logging out', err);
    throw err;
  }
}
