import { MdDarkMode } from 'react-icons/md';
import { BsFillSunFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { GrUserAdmin } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import logo from '../assets/imgs/logo.png';
import darkLogo from '../assets/imgs/darkLogo.jpg';
import { useNavigate } from 'react-router-dom';

const MainHeader = ({ toggleIsDark, loggedInUser, handleLogout, isDark }) => {
  const navigate = useNavigate();

  const setRoute = () => {
    if (loggedInUser) navigate('/msg');
    else navigate('/');
  };
  return (
    <div className="main-header ">
      <section className="container flex justify-between main-layout align-center">
        <div onClick={setRoute}>
          <img className="logo" src={isDark ? darkLogo : logo} alt="" />
        </div>
        {loggedInUser?._id && (
          <section className="actions flex justify-between">
            <div className="toggle-dark">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onClick={toggleIsDark}
              />
              <label htmlFor="checkbox" className="label">
                <MdDarkMode className="moon" />
                <BsFillSunFill className="sun" />
                <div className="ball" />
              </label>
            </div>
            {loggedInUser?.isAdmin && (
              <Link to="/admin" className="admin">
                <GrUserAdmin />
              </Link>
            )}
            <button className="logout" onClick={handleLogout}>
              <FiLogOut />
            </button>
          </section>
        )}
      </section>
    </div>
  );
};

export default MainHeader;
