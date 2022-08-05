import { MdDarkMode } from 'react-icons/md';
import { BsFillSunFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { GrUserAdmin } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const MainHeader = ({ toggleIsDark }) => {
  return (
    <div className="main-header ">
      <section className="container flex justify-between main-layout align-center">
        <div>Logo</div>
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
          <Link to="/admin" className="admin">
            <GrUserAdmin />
          </Link>
          <button className="logout">
            <FiLogOut />
          </button>
        </section>
      </section>
    </div>
  );
};

export default MainHeader;
