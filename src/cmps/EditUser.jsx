import { useState } from 'react';

const EditUser = ({ user, saveUser }) => {
  const [fullname, setFullname] = useState(user?.fullname || '');
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const handleSetUser = (ev) => {
    ev.preventDefault();
    let userToSave;
    if (user?._id) {
      userToSave = JSON.parse(JSON.stringify(user));
      userToSave = {
        username,
        ...userToSave,
        fullname,
        imgUrl: userToSave.imgUrl,
      };
    } else {
      userToSave = {
        username,
        password,
        repassword,
        fullname,
      };
    }
    console.log(userToSave);
    saveUser(userToSave);
  };

  return (
    <div>
      <form action="" onSubmit={handleSetUser}>
        <input
          type="text"
          value={fullname}
          onChange={(ev) => {
            setFullname(ev.target.value);
          }}
        />
        <input
          type="text"
          value={username}
          onChange={(ev) => {
            setUsername(ev.target.value);
          }}
        />
        {!user?._id && (
          <>
            <input
              type="password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />
            <input
              type="password"
              value={repassword}
              onChange={(ev) => {
                setRepassword(ev.target.value);
              }}
            />
          </>
        )}
        <button>Save</button>
      </form>
    </div>
  );
};

export default EditUser;
