const UserPreview = ({
  user,
  deleteUser,
  updateUser,
  isAdmin,
  toggleFriend,
}) => {
  return (
    <div className="user-preview flex justify-between">
      <div>{user.fullname}</div>
      <section className="actions">
        {isAdmin && (
          <button onClick={() => updateUser(user)}>updateUser</button>
        )}
        <button onClick={() => toggleFriend(user._id)}>+</button>
        {isAdmin && (
          <button onClick={() => deleteUser(user._id)}>DELETE</button>
        )}
      </section>
    </div>
  );
};

export default UserPreview;
