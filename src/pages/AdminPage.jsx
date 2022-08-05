import EditUser from '../cmps/EditUser';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser, setUser, loadUsers } from '../store/actions/userActions';
import UserList from '../cmps/UserList';

const AdminPage = () => {
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.userModule);
  const { users } = useSelector((state) => state.userModule);

  const [isModalOpen, setIsModalOpen] = useState(true);
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
    <>
      {loggedInUser?.isAdmin && (
        <div className="admin-page main-layout">
          {isModalOpen && <EditUser user={userToEdit} saveUser={saveUser} />}
          <UserList
            users={usersToShow()}
            updateUser={openModal}
            deleteUser={deleteUser}
            isAdmin={loggedInUser.isAdmin}
          />
          <button onClick={openModal}>add</button>
        </div>
      )}
    </>
  );
};

export default AdminPage;
