import axios from 'axios';
import { authService } from './auth-service';
import { utilService } from './util-service';

const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/user'
    : '//localhost:3030/api/user/';

export const userService = {
  getById,
  remove,
  save,
  getUsers,
};

async function getUsers() {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.error('Err while getting users from the server', err);
  }
}
async function getById(id) {
  try {
    const res = await axios.get(BASE_URL + id);
    return res.data;
  } catch (err) {
    console.error('Err while getting user from the server', err);
  }
}

async function remove(id) {
  try {
    const res = await axios.delete(BASE_URL + id);
    utilService.save('user_db', {});
    return res.data;
  } catch (err) {
    console.error('Err while deleting user from the server', err);
  }
}

async function save(user) {
  try {
    if (user?._id) {
      const res = await axios.put(BASE_URL + user._id, user);
      return res.data;
    } else {
      return authService.signup(user);
    }
  } catch (err) {
    console.error('Err while saving user', err);
  }
}
