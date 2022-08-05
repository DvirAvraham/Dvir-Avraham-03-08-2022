import UserPreview from './UserPreview';
const UserList = ({
  users,
  toggleFriend,
  setChat,
  isFriendsList,
  activChatUserId,
  updateUser,
  deleteUser,
  isAdmin,
}) => {
  return (
    <div className="user-list">
      <section className=" flex column user-container">
        {users?.length ? (
          users.map((user) => (
            <UserPreview
              key={user._id}
              user={user}
              toggleFriend={toggleFriend}
              setChat={setChat}
              isFriendsList={isFriendsList}
              activChatUserId={activChatUserId}
              updateUser={updateUser}
              deleteUser={deleteUser}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <div className="msg main-layout">Nothing to see here..</div>
        )}
      </section>
    </div>
  );
};

export default UserList;
