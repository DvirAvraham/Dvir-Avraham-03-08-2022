import FriendPreview from './FriendPreview';
const FriendList = ({ friends, toggleFriend, setChat }) => {
  return (
    <div>
      <div>Your Friends</div>
      <section className="flex column user-container">
        {friends?.length &&
          friends.map((friend) => (
            <FriendPreview
              key={friend._id}
              friend={friend}
              toggleFriend={toggleFriend}
              setChat={setChat}
            />
          ))}
      </section>
    </div>
  );
};

export default FriendList;
