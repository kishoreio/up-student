import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../resources/trophy.png';
import profile from '../../resources/profile.png';

function Header({ isLoggedIn, changeLoggedStatus, name }) {
  return (
    <header className="border-b-4 border-pink-600 flex justify-between items-center w-full">
      <div className="flex flex-row items-center py-4 ml-4">
        <img src={logo} alt="logo" className="w-12 mr-4" />
        <h1 className="text-2xl font-sans font-semibold text-pink-600 italic">UpStudent</h1>
      </div>
      {isLoggedIn ? (
        <div className="flex flex-col items-center justify-center mr-4">
          <figure className="flex items-center">
            <img src={profile} alt="profile" className="profile-size" />
            <figcaption>{`Hi ${name}`}</figcaption>
          </figure>
          <Link to="/" onClick={() => changeLoggedStatus(false, '')}>
            <p className="-mt-3 ml-8 border-2 border-teal-800 py-1 px-1 bg-teal-500 text-white hover:bg-red-600">
              Logout
            </p>
          </Link>
        </div>
      ) : null}
    </header>
  );
}

Header.defaultProps = {
  name: '',
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  changeLoggedStatus: PropTypes.func.isRequired,
  name: PropTypes.string,
};
export default Header;
