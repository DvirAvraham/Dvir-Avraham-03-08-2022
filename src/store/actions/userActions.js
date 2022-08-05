import { authService } from '../../services/auth-service';
import { utilService } from '../../services/util-service';
import { userService } from '../../services/user-service';
import { chatService } from '../../services/chat-service';
import { socketService } from '../../services/socket-service';

export function setLoggedInUser({ user, isSignup }) {
  return async (dispatch) => {
    try {
      const loggedInUser = isSignup
        ? await authService.signup(user)
        : await authService.login(user);
      utilService.save('user_db', loggedInUser);
      socketService.emit('set-user-socket', loggedInUser._id);
      if (isSignup) {
        socketService.emit('sign-up', { userId: loggedInUser?._id });
      }
      dispatch({ type: 'SET_USER', loggedInUser });
      return true;
    } catch (err) {
      dispatch(
        handleError(`Error while ${isSignup ? 'signing up' : 'logging in'} ..`)
      );
    }
  };
}

export function loadFriends() {
  return async (dispatch, getState) => {
    try {
      let { loggedInUser } = getState().userModule;
      let userFriends;
      if (!loggedInUser?.friendsIds?.length) userFriends = [];
      else {
        userFriends = await Promise.all(
          loggedInUser.friendsIds.map((id) => userService.getById(id))
        );
      }
      dispatch({ type: 'SET_FRIENDS', userFriends });
    } catch (err) {
      dispatch(handleError('Error while loading friends'));
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await authService.logout();
      utilService.save('user_db', '');
      dispatch({ type: 'SET_USER', loggedInUser: null });
    } catch (err) {
      dispatch(handleError('Error while try to logout'));
    }
  };
}
export function loadUsers() {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers();
      dispatch({ type: 'SET_USERS', users });
    } catch (err) {
      dispatch(handleError('Error while loading users'));
    }
  };
}

export function removeUser(id) {
  return async (dispatch, getState) => {
    try {
      await userService.remove(id);
      const { users } = getState().userModule;
      const updatedUsers = users.filter((user) => user._id !== id);
      dispatch({ type: 'SET_USERS', users: updatedUsers });
    } catch (err) {
      dispatch(handleError('Error while removing user'));
    }
  };
}

export function loadLoggedInUser() {
  return async (dispatch, getState) => {
    try {
      const { loggedInUser } = getState().userModule;
      const loggedInUserId =
        loggedInUser?._id || utilService.load('user_db')._id;
      if (!loggedInUserId) return true;
      socketService.emit('set-user-socket', loggedInUserId);
      const user = await userService.getById(loggedInUserId);
      dispatch({ type: 'SET_USER', loggedInUser: user });
    } catch (err) {
      dispatch(handleError('Error while loading your account'));
    }
  };
}

export function setChat(toChatIds = null, chat = null) {
  return async (dispatch, getState) => {
    try {
      if (chat) return dispatch({ type: 'SET_CHAT', currChat: chat });
      const { loggedInUser } = getState().userModule;
      const chatId = loggedInUser.chatsIds.find((id) => toChatIds.includes(id));
      const currChat = await chatService.getById(chatId);
      dispatch({ type: 'SET_CHAT', currChat });
    } catch (err) {
      dispatch(handleError('Error while setting chat'));
    }
  };
}

export function addMsg(txt) {
  return async (dispatch, getState) => {
    try {
      const { currChat } = getState().userModule;
      const { loggedInUser } = getState().userModule;
      const chatCopy = JSON.parse(JSON.stringify(currChat));
      const msgToSave = {
        txt,
        createdAt: Date.now(),
        createdBy: loggedInUser._id,
      };
      chatCopy.msgs.push(msgToSave);
      await chatService.updateChat(msgToSave, currChat._id);
      socketService.emit('add-msg', {
        msg: `${loggedInUser.fullname} just sent you a massage`,
        to: currChat.members.find((member) => member._id !== loggedInUser._id),
        chat: chatCopy,
      });
      dispatch({ type: 'SET_CHAT', currChat: chatCopy });
    } catch (err) {
      dispatch(handleError('Error while sending a msg'));
    }
  };
}

export function setFriend(friend) {
  return async (dispatch, getState) => {
    try {
      const { loggedInUser } = getState().userModule;
      const { userFriends } = getState().userModule;
      let userFriendsCopy = JSON.parse(JSON.stringify(userFriends));
      if (friend.friendsIds.includes(loggedInUser._id)) {
        userFriendsCopy.push(friend);
      } else {
        const userIdx = userFriendsCopy.findIndex((f) => f._id === friend._id);
        if (userIdx !== -1) userFriendsCopy.splice(userIdx, 1);
      }
      dispatch({ type: 'SET_FRIENDS', userFriends: userFriendsCopy });
    } catch (err) {
      dispatch(handleError('Error while setting friends'));
    }
  };
}

export function setUser(user) {
  return async (dispatch, getState) => {
    try {
      const updatedUser = await userService.save(user);
      const { users } = getState().userModule;
      let usersCopy = JSON.parse(JSON.stringify(users));
      if (user._id) {
        const idx = usersCopy.findIndex((u) => u._id === user._id);
        usersCopy.splice(idx, 1, updatedUser);
      } else {
        usersCopy.push(updatedUser);
      }
      dispatch({ type: 'SET_USERS', users: usersCopy });
    } catch (err) {
      dispatch(handleError(`Error while setting user: ${user.fullname}`));
    }
  };
}

export function toggleFriends(id) {
  return async (dispatch, getState) => {
    try {
      const { loggedInUser } = getState().userModule;
      const { userFriends } = getState().userModule;
      let userCopy = JSON.parse(JSON.stringify(loggedInUser));
      let userFriendsCopy = JSON.parse(JSON.stringify(userFriends));
      const friend = await userService.getById(id);
      let socketTxt;

      if (userCopy.friendsIds?.includes(id)) {
        const friendIdx = userCopy.friendsIds.findIndex((i) => i === id);
        userCopy.friendsIds.splice(friendIdx, 1);
        const userIdx = userFriendsCopy.findIndex(
          (friend) => friend._id === id
        );
        userFriendsCopy.splice(userIdx, 1);
        const idx = friend.friendsIds.findIndex(
          (id) => id === loggedInUser._id
        );
        friend.friendsIds.splice(idx, 1);
        socketTxt = 'removed you from';
      } else {
        userCopy.friendsIds.push(id);
        userFriendsCopy.push(friend);
        friend.friendsIds.push(loggedInUser._id);
        socketTxt = 'added you to';
      }

      await userService.save(userCopy);
      await userService.save(friend);

      socketService.emit('notify-toggle-friends', {
        to: friend,
        from: userCopy,
        msg: `${loggedInUser.fullname} ${socketTxt} his friends list`,
      });

      utilService.save('user_db', userCopy);
      dispatch({ type: 'SET_USER', loggedInUser: userCopy });
      dispatch({ type: 'SET_FRIENDS', userFriends: userFriendsCopy });
    } catch (err) {
      dispatch(handleError('Error while toggel friends'));
    }
  };
}

export function toggleDarkMode() {
  return async (dispatch, getState) => {
    try {
      const { isDark } = getState().userModule;
      dispatch({ type: 'SET_IS_DARK', isDark: !isDark });
    } catch (err) {
      dispatch(handleError('Error while switching modes'));
    }
  };
}

export function handleError(msg) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_MSG', errorMsg: msg });
    } catch (err) {
      console.error(`Fatal error ${err}`);
    }
  };
}
