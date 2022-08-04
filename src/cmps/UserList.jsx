import UserPreview from './UserPreview';

const UserList = ({ users, deleteUser, updateUser, isAdmin, toggleFriend }) => {
  return (
    <div>
      <div>Find Friends</div>
      <section className="user-container">
        {users.map((user) => (
          <UserPreview
            key={user._id}
            user={user}
            deleteUser={deleteUser}
            updateUser={updateUser}
            isAdmin={isAdmin}
            toggleFriend={toggleFriend}
          />
        ))}
      </section>
    </div>
  );
};

export default UserList;
