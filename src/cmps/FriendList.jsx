import FriendPreview from './FriendPreview';
const FriendList = ({ friends, toggleFriend, setChat, isFriendsList }) => {
  return (
    <div>
      <section className="user-list flex column user-container">
        {friends?.length ? (
          friends.map((friend) => (
            <FriendPreview
              key={friend._id}
              friend={friend}
              toggleFriend={toggleFriend}
              setChat={setChat}
              isFriendsList={isFriendsList}
            />
          ))
        ) : (
          <div className="msg main-layout">Nothing to see here..</div>
        )}
      </section>
    </div>
  );
};

export default FriendList;
