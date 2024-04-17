import React from 'react'
import { BsActivity , BsPersonPlus}
from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
      <div className='header-data'>
          <Link to="/" className="button-link">
            <BsActivity className="icon" /> Personal Details
          </Link>
          <span className="spacer"></span>
          <Link to="/" className="button-link">
            <BsActivity className="icon" /> Educational Details
          </Link>         <span className="spacer"></span>
          
          <Link to="/add-achievements" className="button-link">
            <BsPersonPlus className="icon" /> Achievements and Certifications
          </Link>
      </div>
  
    </header>
  )
}

export default Header
