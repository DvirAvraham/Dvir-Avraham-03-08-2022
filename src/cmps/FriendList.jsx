import FriendPreview from './FriendPreview';
const FriendList = ({
  friends,
  toggleFriend,
  setChat,
  isFriendsList,
  activChatUserId,
}) => {
  return (
    <div className="user-list">
      <section className=" flex column user-container">
        {friends?.length ? (
          friends.map((friend) => (
            <FriendPreview
              key={friend._id}
              friend={friend}
              toggleFriend={toggleFriend}
              setChat={setChat}
              isFriendsList={isFriendsList}
              activChatUserId={activChatUserId}
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
