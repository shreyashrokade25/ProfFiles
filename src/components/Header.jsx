import React from 'react'
import { BsActivity}
from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
      <div className='header-data'>
          <Link to="/add-activity" className="button-link">
            <BsActivity className="icon" /> Personal Details
          </Link>
          <span className="spacer"></span>
          <Link to="/add-activity" className="button-link">
            <BsActivity className="icon" /> Educational Details
          </Link>         <span className="spacer"></span>
          
          <Link to="/add-activity" className="button-link">
            <BsActivity className="icon" /> Activities
          </Link>
      </div>
  
    </header>
  )
}

export default Header
