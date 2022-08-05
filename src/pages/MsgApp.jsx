import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadFriends,
  loadUsers,
  toggleFriends,
  setChat,
  loadLoggedInUser,
} from '../store/actions/userActions';
import UserList from '../cmps/UserList';
import Chat from '../cmps/Chat';

const MsgApp = () => {
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.userModule);
  const { userFriends } = useSelector((state) => state.userModule);
  const { users } = useSelector((state) => state.userModule);
  const { currChat } = useSelector((state) => state.userModule);

  const [isChatOpen, setIsChatOpen] = useState(null);
  const [isFriendsList, setIsFriendsList] = useState(true);
  const [activChatUserId, setActivChatUserId] = useState('');

  const fetchData = async () => {
    await dispatch(loadLoggedInUser());
    dispatch(loadFriends());
    dispatch(loadUsers());
  };

  useEffect(() => {
    // const failed = await dispatch(loadLoggedInUser());
    // if (failed) navigate('/');
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let activUser;
    if (!currChat?.members) setActivChatUserId('');
    else {
      activUser = currChat.members.find(
        (member) => member._id !== loggedInUser._id
      );
      if (activUser) setActivChatUserId(activUser._id);
    }
  }, [currChat]);

  const usersForDisplay = () => {
    return users.filter(
      (user) =>
        user._id !== loggedInUser?._id &&
        !loggedInUser?.friendsIds?.includes(user._id)
    );
  };

  const toggleFriend = (id) => {
    dispatch(toggleFriends(id));
  };

  const handleSetChat = (friendChatsIds) => {
    setIsChatOpen(true);
    dispatch(setChat(friendChatsIds, null));
  };

  return (
    <div className="msg-app main-layout flex">
      <section className="list flex column ">
        <div className="toggle flex justify-around align-center">
          <div onClick={() => setIsFriendsList(true)}>Friends</div>
          <div onClick={() => setIsFriendsList(false)}>Users</div>
        </div>
        {(userFriends?.length || users?.length) && (
          <UserList
            users={isFriendsList ? userFriends : usersForDisplay()}
            toggleFriend={toggleFriend}
            setChat={handleSetChat}
            isFriendsList={isFriendsList}
            activChatUserId={activChatUserId}
          />
        )}
      </section>
      {isFriendsList ? (
        <div className="main-chat">
          {isChatOpen && (
            <Chat currChat={currChat} loggedInUserId={loggedInUser._id} />
          )}
        </div>
      ) : (
        <div className="mashu"></div>
      )}
    </div>
  );
};

export default MsgApp;
