import EditUser from '../cmps/EditUser';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser, setUser, loadUsers } from '../store/actions/userActions';
import UserList from '../cmps/UserList';
import adminBgImg from '../assets/svgs/admin-bgImg.svg';

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
    <div className="admin-page main-layout">
      {loggedInUser?.isAdmin && (
        <div className={`container main-layout ${isModalOpen && 'blur'}`}>
          <div className="title">Admin, welcome back!</div>
          <div className="admin-users">
            <div className="list-title flex justify-center align-center">
              <img className="settings" src={adminBgImg} alt="" />
              All users
            </div>
            <UserList
              users={usersToShow()}
              updateUser={openModal}
              deleteUser={deleteUser}
              isAdmin={loggedInUser.isAdmin}
            />
          </div>
          {!isModalOpen && (
            <button className="create" onClick={openModal}>
              Create User
            </button>
          )}
        </div>
      )}
      {isModalOpen && <EditUser user={userToEdit} saveUser={saveUser} />}
      <div
        className={isModalOpen ? 'cover' : null}
        onClick={() => setIsModalOpen(false)}
      ></div>
    </div>
  );
};

export default AdminPage;
