import {
  AiOutlineUserDelete,
  AiOutlineUserAdd,
  AiOutlineUsergroupDelete,
} from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

const UserPreview = ({
  user,
  toggleFriend,
  setChat,
  isFriendsList,
  activChatUserId,
  updateUser,
  deleteUser,
  isAdmin,
}) => {
  const { isDark } = useSelector((state) => state.userModule);

  const handelDeleteUser = (ev) => {
    ev.stopPropagation();
    deleteUser(user._id);
  };

  const handelUpdateUser = (ev) => {
    ev.stopPropagation();
    updateUser(user);
  };

  const handleSetChat = () => {
    if (isAdmin) return;
    setChat(user);
  };

  const handleToggleFriend = (ev) => {
    ev.stopPropagation();
    toggleFriend(user._id);
  };

  return (
    <div
      className={`user-preview flex justify-between${
        activChatUserId === user._id ? ' activ' : ''
      } ${isDark ? 'dark' : ''}`}
      onClick={handleSetChat}
    >
      <div className={`info flex justify-between ${isDark ? 'dark' : ''}`}>
        <div className="img">
          <img src={user.imgUrl} alt="" />
        </div>
        <div className="details flex column justify-center">
          <div>{user.fullname} </div>
          {isFriendsList && (
            <div className="msg disabled flex ">
              <div>msg</div>
              <span>·</span>
              <div>1 hour ago</div>
            </div>
          )}
        </div>
      </div>
      <section className="actions flex align-center">
        {isAdmin ? (
          <>
            <button className="delete" onClick={handelDeleteUser}>
              <AiOutlineUsergroupDelete />
            </button>
            <button className="update" onClick={handelUpdateUser}>
              <FaUserEdit />
            </button>
          </>
        ) : (
          <button
            className={`toggle-friend ${isFriendsList ? 'remove' : 'add'}`}
            onClick={handleToggleFriend}
          >
            {isFriendsList ? <AiOutlineUserDelete /> : <AiOutlineUserAdd />}
          </button>
        )}
      </section>
    </div>
  );
};

export default UserPreview;
