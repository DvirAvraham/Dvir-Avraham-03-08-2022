import { AiOutlineUserDelete, AiOutlineUserAdd } from 'react-icons/ai';

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
  const handleToggleFriend = (ev) => {
    ev.stopPropagation();
    toggleFriend(user._id);
  };

  return (
    <div
      className={`user-preview flex justify-between${
        activChatUserId === user._id ? ' activ' : ''
      }`}
      onClick={() => setChat(user.chatsIds)}
    >
      <div className="info flex justify-between">
        <div className="img">
          <img src={user.imgUrl} alt="" />
        </div>
        <div className="details flex column justify-center">
          <div>{user.fullname} </div>
          <div className="msg flex">
            <div>msg</div>
            <span>·</span>
            <div>1 hour ago</div>
          </div>
        </div>
      </div>
      <section className="actions flex align-center">
        <button
          className={`toggle-friend ${isFriendsList ? 'remove' : 'add'}`}
          onClick={handleToggleFriend}
        >
          {isFriendsList ? <AiOutlineUserDelete /> : <AiOutlineUserAdd />}
        </button>
      </section>
    </div>
  );
};

export default UserPreview;
