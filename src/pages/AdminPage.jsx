import EditUser from '../cmps/EditUser';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser, setUser, loadUsers } from '../store/actions/userActions';
import UserList from '../cmps/UserList';

const AdminPage = () => {
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.userModule);
  const { users } = useSelector((state) => state.userModule);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const usersToShow = () => {
    return users.filter((user) => user._id !== loggedInUser._id);
  };

  const deleteUser = (id) => {
    if (loggedInUser?.isAdmin) dispatch(removeUser(id));
  };

  const openModal = (user) => {
    if (!loggedInUser?.isAdmin) return;
    setIsModalOpen((state) => !state);
    setUserToEdit(user);
  };

  const saveUser = (updatedUser) => {
    setIsModalOpen((state) => !state);
    dispatch(setUser(updatedUser));
  };
  return (
    <div className="admin-page">
      {loggedInUser?.isAdmin && (
        <div className="container main-layout">
          <div className="title">Admin, welcome back!</div>
          {isModalOpen && <EditUser user={userToEdit} saveUser={saveUser} />}
          <div className="admin-users">
            <div className="list-title flex justify-center align-center">
              All users
            </div>
            <UserList
              users={usersToShow()}
              updateUser={openModal}
              deleteUser={deleteUser}
              isAdmin={loggedInUser.isAdmin}
            />
          </div>
          <button className="create" onClick={openModal}>
            Create User
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
