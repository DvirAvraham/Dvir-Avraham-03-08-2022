import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/auth'
    : '//localhost:3030/api/chat/';

export const chatService = {
  updateChat,
  getById,
};

async function updateChat(msg, chatId) {
  try {
    const res = await axios.put(BASE_URL + chatId, msg);
    return res.data;
  } catch (err) {
    console.error('Err while updating chat', err);
    throw err;
  }
}

async function getById(id) {
  try {
    const res = await axios.get(BASE_URL + id);
    return res.data;
  } catch (err) {
    console.error('Err while getting chat from the server', err);
  }
}
