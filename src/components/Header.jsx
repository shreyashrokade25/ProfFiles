import React from 'react';
import { Link } from 'react-router-dom';
import { BsActivity, BsPersonPlus } from 'react-icons/bs';

function Header() {
  return (
    <header className='header'>
      <nav className='navbar'>
        <ul className='navbar-list'>
          <li className='navbar-item'>
            <Link to="/add-PersonalDetails" className="navbar-link">
              <BsActivity className="icon" /> Personal Details
            </Link>
          </li>
          <Link to="/add-EducationalDetails" className="button-link spacer">
            <BsActivity className="icon" /> Educational Details
          </Link>
          <li className='navbar-item'>
            <Link to="/add-CurricularDetails" className="navbar-link">
              <BsActivity className="icon" /> Curricular & Co-curricular Details
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to="/add-AchievementDetails" className="navbar-link">
              <BsPersonPlus className="icon" /> Achievements and Certifications
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to="/add-ProjectDetails" className="navbar-link">
              <BsActivity className="icon" /> Project Details
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
