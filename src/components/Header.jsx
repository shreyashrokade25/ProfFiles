import React from 'react';
import { Link } from 'react-router-dom';
import { BsActivity, BsPersonPlus } from 'react-icons/bs';

function Header() {
  return (
    <header className='header'>
      <nav className='navbar'>
        <ul className='navbar-list'>
          <li className='navbar-item'>
            <Link to="/" className="navbar-link">
              <BsActivity className="icon" /> Personal Details
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to="/" className="navbar-link">
              <BsActivity className="icon" /> Educational Details
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to="/" className="navbar-link">
              <BsActivity className="icon" /> Curricular & Co-curricular Details
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to="/add-achievements" className="navbar-link">
              <BsPersonPlus className="icon" /> Achievements and Certifications
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to="/project" className="navbar-link">
              <BsActivity className="icon" /> Project Details
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
