import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadFriends,
  loadUsers,
  toggleFriends,
  setChat,
  loadLoggedInUser,
  handleError,
} from '../store/actions/userActions';
import UserList from '../cmps/UserList';
import Chat from '../cmps/Chat';
import ChatFiller from '../cmps/ChatFiller';
import { AiFillCloseCircle } from 'react-icons/ai';

const MsgApp = () => {
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.userModule);
  const { userFriends } = useSelector((state) => state.userModule);
  const { users } = useSelector((state) => state.userModule);
  const { currChat } = useSelector((state) => state.userModule);
  const { isDark } = useSelector((state) => state.userModule);

  const [isChatOpen, setIsChatOpen] = useState(null);
  const [isFriendsList, setIsFriendsList] = useState(true);
  const [activChatUser, setActivChatUser] = useState('');

  const fetchData = async () => {
    await dispatch(loadLoggedInUser());
    dispatch(loadFriends());
    dispatch(loadUsers());
  };

  const handleCloseChat = () => {
    setActivChatUser(null);
    setIsChatOpen(null);
  };

  useEffect(() => {
    // const failed = await dispatch(loadLoggedInUser());
    // if (failed) navigate('/');
    fetchData();
    // eslint-disable-next-line
    return () => {
      handleCloseChat();
    };
  }, []);

  useEffect(() => {
    let activUser;
    if (!currChat?.members) setActivChatUser('');
    else {
      activUser = currChat.members.find(
        (member) => member._id !== loggedInUser._id
      );
      if (activUser) setActivChatUser(activUser);
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

  const handleSetChat = (user) => {
    if (!loggedInUser.isPremium) {
      return dispatch(handleError('Only premium users can chat!'));
    }
    setIsChatOpen(true);
    dispatch(setChat(user.chatsIds, null));
  };

  return (
    <div>
      <div className="greet-title main-layout">
        {loggedInUser?.fullname} has entered the chat...
      </div>

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
              activChatUserId={activChatUser?._id}
            />
          )}
        </section>
        {isFriendsList ? (
          <div className={`main-chat ${activChatUser ? 'activ' : ''} `}>
            {isChatOpen ? (
              <>
                <div className="chat-header flex align-center">
                  <div className="img">
                    <img src={activChatUser?.imgUrl} alt="" />
                  </div>
                  <div className="user-name">{activChatUser?.fullname}</div>
                  <div className="close-chat" onClick={handleCloseChat}>
                    <AiFillCloseCircle />
                  </div>
                </div>
                <Chat
                  currChat={currChat}
                  loggedInUserId={loggedInUser._id}
                  isDark={isDark}
                />
              </>
            ) : (
              <ChatFiller
                txt={'Send private messages to your friends.'}
                isFriendsList={isFriendsList}
                isDark={isDark}
              />
            )}
          </div>
        ) : (
          <ChatFiller
            isDark={isDark}
            txt={'Add user to your friends and start chatting.'}
            isFriendsList={isFriendsList}
          />
        )}
      </div>
    </div>
  );
};

export default MsgApp;
