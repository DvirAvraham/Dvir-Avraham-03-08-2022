import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadFriends,
  loadUsers,
  removeUser,
  setUser,
  toggleFriends,
  setChat,
  loadLoggedInUser,
} from '../store/actions/userActions';
import FriendList from '../cmps/FriendList';
import UserList from '../cmps/UserList';
import EditUser from '../cmps/EditUser';
import ChatModal from '../cmps/ChatModal';

const MsgApp = () => {
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.userModule);
  const { userFriends } = useSelector((state) => state.userModule);
  const { users } = useSelector((state) => state.userModule);
  const { currChat } = useSelector((state) => state.userModule);

  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(null);
  const [userToEdit, setUserToEdit] = useState({});

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

  const usersForDisplay = () => {
    return users.filter(
      (user) =>
        user._id !== loggedInUser?._id &&
        !loggedInUser?.friendsIds.includes(user._id)
    );
  };

  const deleteUser = (id) => {
    if (loggedInUser?.isAdmin) dispatch(removeUser(id));
  };

  const openModal = (user) => {
    if (!loggedInUser?.isAdmin) return;
    setIsModalOpen((state) => !state);
    setUserToEdit(user);
  };

  const saveUser = (updatedUser) => {
    setIsModalOpen((state) => !state);
    dispatch(setUser(updatedUser));
  };

  const toggleFriend = (id) => {
    dispatch(toggleFriends(id));
  };

  const handleSetChat = (friendChatsIds) => {
    setIsChatOpen((state) => !state);
    dispatch(setChat(friendChatsIds, null));
  };

  return (
    <div className="msg-app main-layout">
      <div className="title">
        {loggedInUser?.fullname} has entered the chat..
      </div>
      <section className="flex column justify-between">
        {isModalOpen && <EditUser user={userToEdit} saveUser={saveUser} />}
        {userFriends?.length && (
          <FriendList
            friends={userFriends}
            toggleFriend={toggleFriend}
            setChat={handleSetChat}
          />
        )}
        {users?.length && (
          <UserList
            users={usersForDisplay()}
            deleteUser={deleteUser}
            updateUser={openModal}
            isAdmin={loggedInUser?.isAdmin}
            toggleFriend={toggleFriend}
          />
        )}
      </section>
      {loggedInUser?.isAdmin && <button onClick={openModal}>add</button>}
      {isChatOpen && (
        <ChatModal setIsChatOpen={setIsChatOpen} currChat={currChat} />
      )}
    </div>
  );
};

export default MsgApp;
