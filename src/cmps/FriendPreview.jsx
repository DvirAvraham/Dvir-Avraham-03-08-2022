const FriendPreview = ({ friend, toggleFriend, setChat }) => {
  return (
    <div className="friend-preview flex justify-between">
      <div>{friend.fullname}</div>
      <section className="actions">
        <button onClick={() => toggleFriend(friend._id)}>-</button>
        <button onClick={() => setChat(friend.chatsIds)}>Massenger</button>
      </section>
    </div>
  );
};

export default FriendPreview;
