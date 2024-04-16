import React from 'react'
import { BsActivity}
from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
      <div className='header-data'>
          <Link to="/view-activity" className="button-link spacer">
            <BsActivity className="icon" /> Personal Details
          </Link>

          <Link to="/" className="button-link spacer">
            <BsActivity className="icon" /> Educational Details
          </Link>
          
          <Link to="/" className="button-link spacer">
            <BsActivity className="icon" /> Curricular & Co-curricular Details
          </Link>
          
          <Link to="/add-activity" className="button-link spacer">
            <BsActivity className="icon" /> Achievement & Certification
          </Link>

          <Link to="/project" className="button-link spacer">
            <BsActivity className="icon" /> Project Details
          </Link>
      </div>
  
    </header>
  )
}

export default Header
