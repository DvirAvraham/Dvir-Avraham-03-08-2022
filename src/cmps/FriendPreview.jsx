const FriendPreview = ({ friend, toggleFriend, setChat, isFriendsList }) => {
  const handleToggleFriend = (ev) => {
    ev.stopPropagation();
    toggleFriend(friend._id);
  };
  return (
    <div
      className="user-preview flex justify-between"
      onClick={() => setChat(friend.chatsIds)}
    >
      <div className="info flex justify-between">
        <div className="img">
          <img src={friend.imgUrl} alt="" />
        </div>
        <div className="details flex column justify-center">
          <div>{friend.fullname} </div>
          <div className="msg flex">
            <div>msg</div>
            <span>·</span>
            <div>1 hour ago</div>
          </div>
        </div>
      </div>
      <section className="actions flex align-center">
        <button onClick={handleToggleFriend}>
          {isFriendsList ? '-' : '+'}
        </button>
      </section>
    </div>
  );
};

export default FriendPreview;
