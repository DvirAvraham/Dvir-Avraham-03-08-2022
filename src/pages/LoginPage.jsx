import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../store/actions/userActions';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(null);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setIsRepassword] = useState('');

  const setUser = async (ev) => {
    ev.preventDefault();
    if (password !== repassword && isSignup) return;
    const user = {
      username,
      password,
      fullname,
    };
    const success = await dispatch(
      setLoggedInUser({
        user,
        isSignup: isSignup,
      })
    );
    if (success) navigate('/msg');
  };

  return (
    <div className="login main-layout">
      <form onSubmit={setUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        {isSignup && (
          <input
            type="text"
            placeholder="Full name"
            value={fullname}
            onChange={(ev) => setFullname(ev.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        {isSignup && (
          <input
            type="password"
            placeholder="Verify password"
            value={repassword}
            onChange={(ev) => setIsRepassword(ev.target.value)}
          />
        )}
        <button>{isSignup ? 'Sign up' : 'Login'}</button>
      </form>
      <span
        onClick={(ev) => {
          setIsSignup((prev) => !prev);
          ev.preventDefault();
        }}
      >
        {isSignup ? 'Login' : 'Sign up'}
      </span>
    </div>
  );
};

export default LoginPage;
