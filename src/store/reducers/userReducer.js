const INITIAL_STATE = {
  loggedInUser: null,
  userFriends: null,
  users: null,
  currChat: null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      };
    case 'SET_FRIENDS':
      return {
        ...state,
        userFriends: action.userFriends,
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
      };
    case 'SET_CHAT':
      return {
        ...state,
        currChat: action.currChat,
      };
    default:
      return state;
  }
}
