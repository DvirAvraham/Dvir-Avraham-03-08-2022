const FriendPreview = ({ friend, toggleFriend, setChat }) => {
  return (
    <div className="friend-preview flex justify-between">
      <div className="flex justify-between">
        <div>
          <img src={friend.imgUrl} alt="" />
        </div>
        <div>{friend.fullname} </div>
      </div>
      <section className="actions">
        <button onClick={() => toggleFriend(friend._id)}>-</button>
        <button onClick={() => setChat(friend.chatsIds)}>Massenger</button>
      </section>
    </div>
  );
};

export default FriendPreview;
